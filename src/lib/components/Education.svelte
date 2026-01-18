<script lang="ts">
	import { t } from '$lib/stores/i18n';
	import { language } from '$lib/stores/language';
	import { educationData } from '$lib/data/education';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
</script>

<section id="education" class="scroll-mt-24 py-20 px-6 max-w-5xl mx-auto">
	<h2 class="text-3xl md:text-4xl font-bold text-neutral-950 dark:text-neutral-50 mb-12">
		{$t('education.title')}
	</h2>

	<div class="grid grid-cols-1 gap-6">
		{#each educationData as item}
			<Card.Root>
				<Card.Header className="flex-row items-start gap-4">
					<div class="flex-1">
						<Card.Title>
							{$language === 'es' ? item.degree_es : item.degree_en}
						</Card.Title>
						<Card.Description>{item.institution}</Card.Description>
					</div>
					<Card.Action>
						<Badge variant="outline">
							{item.dates === 'Current' ? $t('education.current') : $t('education.completed')}
						</Badge>
					</Card.Action>
				</Card.Header>
				{#if item.location}
					<Card.Content>
						<p class="text-sm text-neutral-500 dark:text-neutral-400">{item.location}</p>
					</Card.Content>
				{/if}
			</Card.Root>
		{/each}
	</div>
</section>
