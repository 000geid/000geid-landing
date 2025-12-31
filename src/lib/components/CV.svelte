<script lang="ts">
  import { cvData } from '$lib/data/cv'
  import { t } from '$lib/stores/i18n'
  import { language } from '$lib/stores/language'

  const downloadLinks = {
    en: '/cv/cv-en.pdf',
    es: '/cv/cv-es.pdf'
  }

  const contactItems = [
    { labelKey: 'contact.email', value: cvData.profile.email, href: `mailto:${cvData.profile.email}` },
    { labelKey: 'contact.phone', value: cvData.profile.phone, href: `tel:${cvData.profile.phone.replace(/[^+\d]/g, '')}` },
    { labelKey: 'contact.location', value: cvData.profile.location }
  ]

  $: lang = $language
  $: localizedIntroduction = cvData.profile.introduction[lang]
</script>

<section id="cv" class="py-20 px-6 bg-neutral-50 dark:bg-neutral-900/40">
  <div class="max-w-6xl mx-auto space-y-12">
    <header class="space-y-6">
      <p class="uppercase text-sm font-semibold tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
        {$t('cv.title')}
      </p>
      <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-4xl md:text-5xl font-black text-neutral-950 dark:text-neutral-50">
            {cvData.profile.name}
          </h2>
          <p class="text-lg text-blue-600 dark:text-blue-400 font-semibold">
            {cvData.profile.title}
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a
            class="px-5 py-3 rounded-full bg-neutral-950 text-white text-sm font-semibold tracking-wide uppercase hover:bg-neutral-800 transition-colors"
            href={downloadLinks.en}
            target="_blank"
            rel="noopener noreferrer"
          >
            {$t('cv.downloadEn')}
          </a>
          <a
            class="px-5 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm font-semibold tracking-wide uppercase text-neutral-950 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            href={downloadLinks.es}
            target="_blank"
            rel="noopener noreferrer"
          >
            {$t('cv.downloadEs')}
          </a>
        </div>
      </div>
      <p class="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-4xl">
        {localizedIntroduction}
      </p>
    </header>

    <div class="grid gap-10 lg:grid-cols-[2fr_1fr]">
      <div class="space-y-8">
        <div>
          <h3 class="text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-4">
            {$t('cv.experience')}
          </h3>
          <div class="space-y-6">
            {#each cvData.experience as role}
              <article class="p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-neutral-100 dark:border-neutral-800">
                <div class="flex flex-col gap-2">
                  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400">
                        {role.company}
                      </p>
                      <h4 class="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
                        {role.role[lang]}
                      </h4>
                    </div>
                    <span class="text-sm text-neutral-500 dark:text-neutral-400">
                      {role.dates}
                    </span>
                  </div>
                  <p class="text-neutral-600 dark:text-neutral-300">
                    {role.summary[lang]}
                  </p>
                </div>
                <ul class="mt-4 space-y-2 text-neutral-700 dark:text-neutral-300 text-sm">
                  {#each role.responsibilities[lang] as item}
                    <li class="flex gap-3">
                      <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                      <span>{item}</span>
                    </li>
                  {/each}
                </ul>
              </article>
            {/each}
          </div>
        </div>
      </div>

      <div class="space-y-8">
        <div class="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <h3 class="text-xl font-semibold text-neutral-950 dark:text-neutral-50 mb-4">
            {$t('cv.contact')}
          </h3>
          <ul class="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
            {#each contactItems as item}
              <li>
                <p class="text-neutral-400 uppercase tracking-[0.3em] text-xs">{$t(item.labelKey)}</p>
                {#if item.href}
                  <a class="hover:text-blue-500 transition-colors" href={item.href}>
                    {item.value}
                  </a>
                {:else}
                  <span>{item.value}</span>
                {/if}
              </li>
            {/each}
          </ul>
        </div>

        <div class="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <h3 class="text-xl font-semibold text-neutral-950 dark:text-neutral-50 mb-4">
            {$t('cv.skills')}
          </h3>
          <div class="space-y-4">
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-2">{$t('cv.programming')}</p>
              <div class="flex flex-wrap gap-2">
                {#each cvData.skills.programming as skill}
                  <span class="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-700 dark:text-neutral-200">
                    {skill}
                  </span>
                {/each}
              </div>
            </div>
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-2">{$t('cv.technologies')}</p>
              <div class="flex flex-wrap gap-2">
                {#each cvData.skills.technologies as tech}
                  <span class="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-700 dark:text-neutral-200">
                    {tech}
                  </span>
                {/each}
              </div>
            </div>
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-2">{$t('cv.languages')}</p>
              <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-300">
                {#each cvData.skills.languages as langItem}
                  <li class="flex justify-between">
                    <span>{langItem.label}</span>
                    <span class="text-neutral-400">{langItem.level}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
          <h3 class="text-xl font-semibold text-neutral-950 dark:text-neutral-50 mb-4">
            {$t('cv.education')}
          </h3>
          <div class="space-y-4">
            {#each cvData.education as school}
              <div>
                <p class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{school.institution}</p>
                <p class="text-sm text-neutral-500 dark:text-neutral-400">{school.degree[lang]}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
