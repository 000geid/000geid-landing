<script lang="ts">
	import { t } from "$lib/stores/i18n";
	import { language } from "$lib/stores/language";
	import { projectsData } from "$lib/data/projects";
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
</script>

<section id="projects" class="scroll-mt-24 py-20 px-6 max-w-5xl mx-auto">
	<h2
		class="text-3xl md:text-4xl font-bold text-neutral-950 dark:text-neutral-50 mb-12"
	>
		{$t("projects.title")}
	</h2>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each projectsData as project (project.id)}
			<div class="group">
				<Card.Root
					className="relative h-full transition-all cursor-pointer group-hover:shadow-md group-hover:-translate-y-0.5"
				>
					<a
						href={`/projects/${project.id}`}
						class="absolute inset-0"
						aria-label={project.title}
					></a>
					<Card.Header className="relative z-10">
						<Card.Title
							className="group-hover:text-blue-500 transition-colors"
						>
							{project.title}
						</Card.Title>
						<Card.Description>
							{project.description[$language]}
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<div class="relative z-10 flex flex-wrap gap-2">
							{#each project.tags as tag}
								<Badge variant="outline">{tag}</Badge>
							{/each}
						</div>
						<Card.Footer className="relative z-10 px-0 pt-4">
							<Button
								variant="link"
								href={`/projects/${project.id}`}
							>
								{$t("projects.story.label")}
							</Button>
						</Card.Footer>
					</Card.Content>
				</Card.Root>
			</div>
		{/each}
	</div>
</section>
