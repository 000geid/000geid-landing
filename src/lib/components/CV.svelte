<script lang="ts">
  import { cvData } from "$lib/data/cv";
  import { t } from "$lib/stores/i18n";
  import { language } from "$lib/stores/language";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import * as Card from "$lib/components/ui/card";

  const downloadLinks = {
    en: "/cv/cv-en.pdf",
    es: "/cv/cv-es.pdf",
  };

  const contactItems = [
    {
      labelKey: "contact.email",
      value: cvData.profile.email,
      href: `mailto:${cvData.profile.email}`,
    },
    { labelKey: "contact.location", value: cvData.profile.location },
  ];

  $: lang = $language;
  $: localizedIntroduction = cvData.profile.introduction[lang];
</script>

<section
  id="cv"
  class="scroll-mt-24 py-20 px-6 bg-neutral-50 dark:bg-neutral-900/40"
>
  <div class="max-w-6xl mx-auto space-y-12">
    <header class="space-y-6">
      <p
        class="uppercase text-sm font-semibold tracking-[0.25em] text-neutral-500 dark:text-neutral-400"
      >
        {$t("cv.title")}
      </p>
      <div
        class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h2
            class="text-4xl md:text-5xl font-black text-neutral-950 dark:text-neutral-50"
          >
            {cvData.profile.name}
          </h2>
          <p class="text-lg text-blue-600 dark:text-blue-400 font-semibold">
            {cvData.profile.title}
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <Button
            href={downloadLinks.en}
            target="_blank"
            rel="noopener noreferrer"
          >
            {$t("cv.downloadEn")}
          </Button>
          <Button
            href={downloadLinks.es}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            {$t("cv.downloadEs")}
          </Button>
        </div>
      </div>
      <p
        class="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-4xl"
      >
        {localizedIntroduction}
      </p>
    </header>

    <div class="grid gap-10 lg:grid-cols-[2fr_1fr]">
      <div class="space-y-8">
        <div>
          <h3
            class="text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-4"
          >
            {$t("cv.experience")}
          </h3>
          <div class="space-y-6">
            {#each cvData.experience as role}
              <Card.Root>
                <Card.Header>
                  <p
                    class="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400"
                  >
                    {role.company}
                  </p>
                  <div
                    class="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                  >
                    <Card.Title className="text-xl"
                      >{role.role[lang]}</Card.Title
                    >
                    <Badge variant="outline">{role.dates}</Badge>
                  </div>
                  <Card.Description>{role.summary[lang]}</Card.Description>
                </Card.Header>
                <Card.Content>
                  <ul
                    class="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm"
                  >
                    {#each role.responsibilities[lang] as item}
                      <li class="flex gap-3">
                        <span
                          class="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"
                        ></span>
                        <span>{item}</span>
                      </li>
                    {/each}
                  </ul>
                </Card.Content>
              </Card.Root>
            {/each}
          </div>
        </div>
      </div>

      <div class="space-y-8">
        <Card.Root>
          <Card.Header className="pb-4">
            <Card.Title className="text-xl">{$t("cv.contact")}</Card.Title>
          </Card.Header>
          <Card.Content>
            <ul
              class="space-y-3 text-sm text-neutral-600 dark:text-neutral-300"
            >
              {#each contactItems as item}
                <li>
                  <p
                    class="text-neutral-400 uppercase tracking-[0.3em] text-xs"
                  >
                    {$t(item.labelKey)}
                  </p>
                  {#if item.href}
                    <a
                      class="hover:text-blue-500 transition-colors"
                      href={item.href}
                    >
                      {item.value}
                    </a>
                  {:else}
                    <span>{item.value}</span>
                  {/if}
                </li>
              {/each}
            </ul>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header className="pb-4">
            <Card.Title className="text-xl">{$t("cv.skills")}</Card.Title>
          </Card.Header>
          <Card.Content>
            <div class="space-y-4">
              <div>
                <p
                  class="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-2"
                >
                  {$t("cv.programming")}
                </p>
                <div class="flex flex-wrap gap-2">
                  {#each cvData.skills.programming as skill}
                    <Badge variant="outline">{skill}</Badge>
                  {/each}
                </div>
              </div>
              <div>
                <p
                  class="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-2"
                >
                  {$t("cv.technologies")}
                </p>
                <div class="flex flex-wrap gap-2">
                  {#each cvData.skills.technologies as tech}
                    <Badge variant="outline">{tech}</Badge>
                  {/each}
                </div>
              </div>
              <div>
                <p
                  class="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-2"
                >
                  {$t("cv.languages")}
                </p>
                <ul
                  class="space-y-1 text-sm text-neutral-600 dark:text-neutral-300"
                >
                  {#each cvData.skills.languages as langItem}
                    <li class="flex justify-between">
                      <span>{langItem.label}</span>
                      <span class="text-neutral-400">{langItem.level}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header className="pb-4">
            <Card.Title className="text-xl">{$t("cv.education")}</Card.Title>
          </Card.Header>
          <Card.Content>
            <div class="space-y-4">
              {#each cvData.education as school}
                <div>
                  <p
                    class="text-sm font-semibold text-neutral-900 dark:text-neutral-100"
                  >
                    {school.institution}
                  </p>
                  <p class="text-sm text-neutral-500 dark:text-neutral-400">
                    {school.degree[lang]}
                  </p>
                </div>
              {/each}
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  </div>
</section>
