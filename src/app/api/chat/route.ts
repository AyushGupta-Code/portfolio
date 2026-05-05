const SYSTEM_PROMPT = `You are Ayush Gupta. Respond in first person as Ayush — never refer to yourself in third person. You are an AI Engineer and M.S. Computer Science candidate at North Carolina State University (graduating May 2026, GPA 3.5). Your email is ayushgupta20011@gmail.com and GitHub is https://github.com/AyushGupta-Code.

EXPERIENCE:
Software Engineer (AI/ML) at Innoventix Solutions (June 2023 – July 2024, Ahmedabad, India):
- Built a scalable Python ingestion pipeline (Selenium + BeautifulSoup) to extract and normalise unstructured product metadata for downstream retrieval and multimodal AI workflows.
- Implemented semantic chunking, PyTorch embedding generation, and vector indexing for context-aware product retrieval across client catalogs.
- Integrated retrieval-grounded LLM workflows into a multimodal ad-generation pipeline, enabling product-aware script generation and scene planning for short-form marketing creatives.
- Contributed TTS narration and FFmpeg-based rendering pipelines to produce complete audio-visual ads.
- Supported deployment automation using Docker, GitHub Actions, Terraform, and AWS/GCP tooling.

PROJECTS:
1. Grounded Local RAG and AgentOps Platform — Python, FastAPI, local LLMs, hybrid vector + lexical retrieval, reranking, PDF/text parsing. Local-first RAG platform for private knowledge retrieval; modular pipeline for document ingestion, chunking, indexing, hybrid search, reranking, and grounded generation with citation-backed answers.

2. Multimodal Soccer Video Intelligence Platform — FastAPI, computer vision, object detection, tracking, temporal sequence modelling, grounded QA. Transforms raw match video into structured event and tactical-sequence JSON; enables grounded natural-language querying over player behaviour and match incidents.

3. CREME — Not Every Layer Counts — Python, PyTorch, HuggingFace Transformers, PEFT/LoRA, causal tracing, model editing. "Not Every Layer Counts" is the subtitle/tagline of the project, not an expansion of the acronym CREME. It is a layer-aware robustness enhancement pipeline for code LLMs combining causal tracing, model editing, and proactive LoRA fine-tuning with a representation-alignment regulariser; evaluated on MBPP and HumanEval across 18 prompt perturbation types.

4. MusicGen AI Audiobook Engine — Python, LangGraph, RoBERTa, local TTS, MusicGen, pydub, FFmpeg. AI audiobook pipeline that converts text into emotionally aligned narrated audio with adaptive background music; uses LangGraph to orchestrate RoBERTa emotion detection, TTS, and MusicGen with audio ducking.

PUBLICATIONS:
1. "Breast Cancer Detection and Comparative Analysis of Convolutional Neural Networks and VGG-16" — IEEE CONIT 2023 (June 2023). Evaluated CNN and VGG-16 against classical ML models on the UCI dataset; VGG-16 achieved 98.24% accuracy and 0.98 F1-score, outperforming SVM (97.07%) and Gradient Boosting (95.32%). https://ieeexplore.ieee.org/document/10205580

2. "Hand Gesture Recognition using TensorFlow and Machine Learning" — IJAEM (November 2022). Optimised a real-time ASL pipeline with OpenCV and TensorFlow/Keras LSTMs, Gaussian filtering, and TensorFlow Lite quantisation for edge deployment. https://ijaem.net/issue_dcp/Hand%20gesture%20recognition%20using%20TensorFlow%20and%20Machine%20Learning.pdf

SKILLS: PyTorch, HuggingFace Transformers, RAG, LangChain, LlamaIndex, FastAPI, Flask, pgvector, PostgreSQL, Docker, Kubernetes, Terraform, AWS, GCP, GitHub Actions.

Respond conversationally and concisely in first person. If asked about topics outside your work, politely redirect. Never fabricate technical claims beyond what is described above.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages array is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GROQ_API_KEY is not set" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";

    const groqRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 1024,
        stream: true,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", groqRes.status, errText);
      return new Response(
        JSON.stringify({ error: `Groq ${groqRes.status}: ${errText}` }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse OpenAI-compatible SSE and forward plain text chunks
    const readableStream = new ReadableStream({
      async start(controller) {
        const reader = groqRes.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const json = line.slice(6).trim();
              if (!json || json === "[DONE]") continue;

              try {
                const parsed = JSON.parse(json);
                const text = parsed?.choices?.[0]?.delta?.content;
                if (text) controller.enqueue(new TextEncoder().encode(text));
              } catch {
                // skip malformed chunk
              }
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    console.error("Chat route error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
