<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { skillsData } from '$lib/data/skills';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
</script>

<section id="skills" class="scroll-mt-24 py-20 px-6 max-w-5xl mx-auto">
	<h2 class="text-3xl md:text-4xl font-bold text-neutral-950 dark:text-neutral-50 mb-12">
		{$t('skills.title')}
	</h2>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each skillsData as category}
			<Card.Root>
				<Card.Header>
					<Card.Title>{$t(`skills.${category.name}`)}</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="flex flex-wrap gap-2">
						{#each category.skills as skill}
							<Badge variant="outline">{skill}</Badge>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</section>
