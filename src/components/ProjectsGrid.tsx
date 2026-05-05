import Link from "next/link";
import { Column, Row, Text, Tag, Icon } from "@once-ui-system/core";

interface Project {
  name: string;
  description: string;
  tags: string[];
  href: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 18rem), 1fr))",
        gap: "1rem",
        width: "100%",
      }}
    >
      {projects.map((project) => {
        const isInternal = project.href.startsWith("/");
        const linkProps = isInternal
          ? { href: project.href }
          : { href: project.href, target: "_blank", rel: "noopener noreferrer" };

        const tile = (
          <Column
            fillWidth
            border="neutral-medium"
            radius="l"
            padding="l"
            gap="m"
            className="project-tile"
          >
            <Row fillWidth horizontal="between" vertical="start" gap="8">
              <Text variant="heading-strong-m">{project.name}</Text>
              <Icon
                name={isInternal ? "arrowRight" : "arrowUpRightFromSquare"}
                size="s"
                onBackground="neutral-weak"
                style={{ flexShrink: 0, marginTop: "2px" }}
              />
            </Row>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {project.description}
            </Text>
            <Row wrap gap="8" paddingTop="4">
              {project.tags.map((tag) => (
                <Tag key={tag} size="s">
                  {tag}
                </Tag>
              ))}
            </Row>
          </Column>
        );

        return isInternal ? (
          <Link
            key={project.name}
            href={project.href}
            style={{ textDecoration: "none", display: "block" }}
            className="project-tile-link"
          >
            {tile}
          </Link>
        ) : (
          <a
            key={project.name}
            {...linkProps}
            style={{ textDecoration: "none", display: "block" }}
            className="project-tile-link"
          >
            {tile}
          </a>
        );
      })}
    </div>
  );
}
