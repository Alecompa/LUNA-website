import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { processLatex } from "@/utils/processLatex"
import { notFound } from "next/navigation"

// Reference the experiments data from experiments.tsx
const experiments = [
  {
    id: 1,
    title: "$^{14}$N(p,$\\gamma$)$^{15}$O at Bellotti IBF",
    description:
      "Exploring the solar physics at the 3.5 MV accelerator of LNGS Bellotti Ion Beam Facility",
    fullContent: "<strong>PI: Gyürky György</strong> <br /><br /> The $^{14}$N(p,$\\gamma$)$^{15}$O, being the slowest reaction of the CNO cycle, gives the major nuclear contribution to the uncertainty budget in the estimation of the C and N abundances in the Sun using direct Solar CNO neutrino measurements like the one performed by the Borexino collaboration. Up to the current days, R-matrix analyses of the cross section failed to provide a consistent view of both the low and high energy data for the $^{14}$N(p,$\\gamma$)$^{15}$O reaction. The biggest source of uncertainty in the cross-section extrapolation to astrophysical energies lies both in the limited understanding of the weaker transitions and in the lack of angular distribution data especially for the ground state transition at low energies. <br /><br /> The goal of the experiment was thus to measure the reaction cross section in a wide energy range, putting special emphasis also on the weaker transitions and studying the angular distribution. The experiment has been implemented in two complementary phases: A first campaign focused on the measurement of the excitation function using one HPGe detector in close geometry. The second phase is dedicated to the study of the angular distribution using three HPGe detectors. The first beamtime for $^{14}$N(p,$\\gamma$)$^{15}$O started in June 2023, this was the first time ever when beam was delivered to scientific users of the Bellotti IBF. Further campaigns up to July 2024 are devoted to the completion of the second phase. <br /><br /> For the cross section measurements, solid state nitrogen targets were bombarded by the proton beam with hundreds of $\\mu$A intensity provided by the BIBF accelerator. The targets were made either by implantation or by the novel technique of TaN production using enriched 14N gas. For the angular detection of the gamma-radiation, a dedicated setup has been designed allowing the positioning of the detectors at various angles and distances. In the first phase, cross section data were collected with one HPGe detector placed at 55° in the energy range E$_p$ = 0.25 − 1.5 MeV. In the second phase of the experiment, the angular distribution of the most important transitions is measured with three HPGe detectors at five angles, in a similar energy range, where no literature data are available.",
    image: "/images/experiments/14N_pg_MV.jpeg",
  },
  {
    id: 2,
    title: "SHADES at the Bellotti IBF",
    description:
      "Measuring the s-process neutron source reaction $^{22}\\textup{Ne}$($\\alpha$,n)$^{25}$Mg. Founded by ERC Starting Grant.",
    fullContent: "<strong>PI: Andreas Best</strong> <br/><br/> The $^{22}$Ne($\\alpha$,n)$^{25}$Mg reaction is one of the most important reactions for nuclear astrophysics. It is the main neutron source for the weak s-process, which is responsible for the creation of elements in the mass range 50 < A < 90. In addition it provides a secondary neutron burst during the later stages of the main s-process, modifying the abundances around the so called “branch points” of s-process nucleosynthesis, which are important markers for the astrophysical conditions during this phase. Not least, together with its competitor channel $^{22}$Ne($\\alpha$,$\\gamma$)$^{25}$Mg it directly impacts the abundances of the Mg isotopes, which can be directly observed in stellar atmospheres. <br/><br/> The reaction has a negative Q-value and only starts to operate at energies above ca. 600 keV, which lies in the energy range of interest for above mentioned scenarios. The cross section needs to be know from the neutron threshold up to and including a strong resonance at 832 keV, which is the only resonance measured so far in this range. From indirect data we know of the existence of a number of positive parity states below this resonance, but their strengths are not well constrained by nuclear data, leading to massive uncertainties in nucleosynthesis predictions. <br/> <br/> The goal of the underground measurement of $^{22}$Ne($\\alpha$,n)$^{25}$Mg is the first determination of resonance strengths in the astrophysically important energy range and the remeasurement of the 832 keV resonance. This experiment is being carried out in the framework of the ERC starting grant SHADES (no. 852016). By using a novel hybrid neutron detector array we will be able to detect neutrons with a relatively high efficiency while keeping some energy sensitivity, which is crucial for identifying possible beam induced background or external neutron sources. With the high-intensity alpha beam from the new MV accelerator at the Bellotti IBF, the new detection array, a recirculating gas target of > 99.99% enriched $^{22}$Ne and the drastic reduction of the natural neutron background provided by the deep underground location we will achieve a sensitivity increase by over two orders of magnitude over the state of the art, aiming at discovery measurement of so far unseen low energy resonances.",
    image: "/images/experiments/shades.png",
  },
  {
    id: 3,
    title: "$^{12}$C + $^{12}$C at the Bellotti IBF",
    description:
      "Exploring the Carbon fusion through $\\gamma$-ray detection.",
    fullContent: "<strong>PI: Federico Ferraro</strong> <br/><br/>The $^{12}\\textup{C}$+$^{12}\\textup{C}$ reaction is fundamental to several critical astrophysical processes. In stars with masses greater than 8 solar masses, carbon burning occurs after the exhaustion of hydrogen and helium. This reaction plays a key role in shaping the star’s core structure and energy production, determining its evolutionary path toward later stages like supernovae. The $^{12}\\textup{C}$+$^{12}\\textup{C}$ reaction is critical in the ignition of Type Ia supernovae, particularly in carbon-oxygen white dwarfs, where it triggers a thermonuclear runaway that results in the explosion of the white dwarf. In Type II supernovae, carbon fusion also plays a role in the advanced stages of carbon burning in massive stars, contributing to the nucleosynthesis that leads to the star's collapse and explosive death. In neutron star accretion disks, superbursts (intense, rapid outbursts) are thought to be ignited by carbon fusion. Understanding this reaction is key to understanding the physics behind these extreme events, including the ignition depth. Moreover, at very high temperatures the products of $^{12}\\textup{C}$+$^{12}\\textup{C}$ reaction can be responsible of a high-temperature revival of hydrogen and helium burning. This process is important in the advanced stages of stellar evolution and can influence the production of heavier elements. However, the cross section of the $^{12}\\textup{C}$+$^{12}\\textup{C}$ is very difficult to measure and the thermonuclear reaction rate is still very uncertain. Accurate, direct measurements of the $^{12}\\textup{C}$+$^{12}\\textup{C}$ cross-section, especially at low energies, are crucial for resolving the long-standing uncertainties surrounding this reaction. These measurements are key to refining our models of stellar evolution, supernovae, and element formation in the universe, helping us better understand how stars live, die, and produce the elements that make up everything around us. <br /><br /> LUNA is conducting a direct measurement of this reaction deep underground at the Bellotti Ion Beam Facility. This study focuses on the detection of photons emitted in the de-excitation of Ne and Na populated via the two key reaction channels: $^{12}$C($^{12}$C,$\\alpha$)$^{20}$Ne and $^{12}$C($^{12}$C,p)$^{23}$Na. The experimental setup includes a massive lead and copper shielding (about 13 tons in weight) provided with a sliding door, a very sensitive High Purity Germanium (HPGe) detector, a retractable beamline and a syntherized graphite target placed on a water-cooled aluminum target holder produced via additive manufacturing. The rock of the Gran Sasso massif significantly reduces cosmic-ray-induced muons, which results in a clean high-energy region in the gamma spectra. At the same time, the lead and copper shielding effectively suppress the low-energy background caused by natural radioactivity from the rock and the materials surrounding the detector, ensuring a clearer signal for the experiment. Measurements are already underway, but in a few months, a new component will be installed to achieve even higher sensitivity. A segmented 16-fold NaI detector with large angular coverage will be placed around the target and the HPGe detector. It will be used both as an active anti-Compton shield and as a total absorption calorimeter. The very special setup and the unique features of the Bellotti IBF position the LUNA experiment to make the first-ever direct measurement of the C+C reaction in the crucial low-energy regime below 2.2 MeV, with a potential to provide key insights into the carbon fusion process at stellar energy.",
    image: "/images/experiments/12C_12C.jpg",
  },
  {
    id: 4,
    title: "$^{10}$B+$\\alpha$ at the LUNA400",
    description:
      "NUclear CLustering Effects in Astrophysical Reaction.",
    fullContent: "<strong>PI: Marialuisa Aliotta</strong> <br/><br/> The study of the $^{10}$B+$\\alpha$ reactions is of significant astrophysical interest as a potential alternative pathway for the synthesis of elements in the CNO mass region, particularly in the context of first-generation (Population III) stars. In these early stellar environments, conventional CNO nucleosynthesis may be suppressed due to the absence of initial seed nuclei, and reactions involving light elements like boron could play a crucial role. At the LUNA underground laboratory, we aim to investigate the $^{10}$B($\\alpha$,p), $^{10}$B($\\alpha$,d), and $^{10}$B($\\alpha$,n)$^{13}$N reaction channels at the low energies relevant to stellar interiors. Charged particle detection will be used to study the ($\\alpha$,p) and ($\\alpha$,d) channels, while the ($\\alpha$,n)$^{13}$N reaction will be probed via an activation technique, exploiting the β+ decay of $^{13}$N (half-life ≈ 10 minutes), which produces 511 keV annihilation gamma rays. These will be detected in coincidence by opposing crystals of a BGO detector array, enhancing sensitivity. To extend measurements to even lower energies, where activation becomes challenging, we will also explore direct neutron detection using deuterated liquid scintillators. These studies will provide valuable constraints on nucleosynthesis pathways in the early universe and improve our understanding of the chemical evolution driven by the first stars. <br /><br /> These studies form part of the ERC Advanced Grant NUCLEAR, NUclear CLustering Effects in Astrophysical Reactions: Nucleosynthesis in First Stars and Other Puzzles, funded by the UKRI Frontier Research Grant Scheme (no. EP/Z534626/1). For more information, visit <a href=\"https://www.erc-nuclear.uk\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-600 hover:underline\">www.erc-nuclear.uk</a>.",
    image: "/images/experiments/10B_alpha.jpeg",
  },
  {
    id: 5,
    title: "$^{19}$F(p,$\\gamma$)$^{20}$Ne at LUNA400",
    description:
      "Investigating the fluorine depletion in stellar environments through the $^{19}$F(p,$\\gamma$)$^{20}$Ne reaction.",
    fullContent: "<strong>PI: Jakub Skowronski, Axel Boeltzing</strong> <br/><br/> The $^{19}$F(p,$\\gamma$)$^{20}$Ne reaction plays a key role in the nucleosynthesis of fluorine in stellar environments, particularly in asymptotic giant branch (AGB) stars and novae. Accurate cross-section data at astrophysically relevant energies are essential to understand the depletion of fluorine and the operation of the CNO cycles in stellar interiors. Recent measurements at JUNA have provided new insights, but additional data at lower energies are necessary to reduce uncertainties in stellar models. <br /><br /> The LUNA measurement aims to extend the cross-section data of the $^{19}$F(p,$\\gamma$)$^{20}$Ne reaction to even lower energies within the Gamow window relevant for hydrogen burning in stars.The goal is to improve constraints on the reaction rate and to test theoretical models, particularly those involving direct capture and low-energy resonances suggested by recent experiments. <br /><br /> The experiment is being conducted at the LUNA 400 kV accelerator located deep underground in the Gran Sasso Laboratory, benefiting from extremely low background conditions. A high-efficiency BGO detector is used to capture the full $\\gamma$-ray cascade following the $^{19}$F(p,$\\gamma$)$^{20}$Ne reaction.Proton beams are delivered onto a fluorine-rich target under ultra-high vacuum, allowing precise determination of cross sections at energies approaching the stellar Gamow window.",
    image: "/images/experiments/10B_alpha.jpeg",
  },
  {
    id: 6,
    title: "$^{24}$Mg(p,$\\gamma$)$^{25}$Al at LUNA400",
    description:
      "A comprehensive study of the $^{24}$Mg(p,$\\gamma$)$^{25}$Al reaction for understanding Mg-Al cycle in stars.",
    fullContent: "<strong>PI: David Rapagnani</strong> <br/><br/> The $^{24}$Mg(p,$\\gamma$)$^{25}$Al reaction (Q = 2271.37 keV) is relevant in the context of the MgAl cycle which activates during H burning for T ≥ 80 MK. While this reaction provides only a minor contribution to the stellar energy budget, it is a key process affecting the abundances of Mg and Al isotopes in Globular Cluster stars. Spectroscopic analyses of different stars in the same cluster have revealed a Mg–Al anti-correlation similar to the widespread O-Na anti-correlation in the same clusters. This unique abundance pattern is commonly interpreted as the result of the CNO, NeNa and MgAl cycles operating in stars that were born in the early epochs of cluster formation but whose identification has proven challenging. In addition, stardust grains that formed around AGB stars carry the signature of H burning at high temperatures, including indication of partial activation of the MgAl cycle in the form of enhanced $^{26}$Al production by $^{24}$Mg(p,$\\gamma$)$^{25}$Al. To gain a further insight on Al production in stars, a detailed knowledge of all the reactions involved in the MgAl cycle is required, including $^{24}$Mg(p,$\\gamma$)$^{25}$Al. <br/><br/> Experimental knowledge on this reaction is mostly based on a comprehensive cross section measurements at  E$_{lab}$ < 2.3 MeV [Trautvetter] and the last works performed at TUNL and at LUNA focused on the lowest energy resonances only. At temperatures relevant for hydrogen shell burning, the reaction rate is dominated by a direct capture (DC) component, while a resonance at E$_{lab}$ = 222.9 keV solely dominates at higher temperatures. At lower temperatures, a minor contribution is due to the low energy tail of the broad resonance at E$_{lab}$ = 823.3 keV and the uncertainty is dominated by the limited knowledge of the DC component. On the other hand, the DC component also strongly interferes with some of the higher energy resonances, which makes the analysis nontrivial. Due to large uncertainty on DC cross sections at E$_p$ = 823 keV and discrepancy on the E$_{lab}$ = 222.9 keV resonance strength ωγ previously measured, more direct data are necessary to resolve possible systematic offsets. The LUNA400 accelerator could produce proton beam with E$_{p}$ ≤ 400 keV and this give the possibility to explore the low energy region. To achieve the goal of a direct measurement of DC component below 400 keV, this experimental project, in the framework of the LUNA Collaboration, is using enriched solid target, mandatory to avoid beam-induced background from the overwhelmingly strong resonances in $^{25}$Mg(p,$\\gamma$)$^{26}$Al and $^{26}$Mg(p,$\\gamma$)$^{27}$Al at E$_{p}$ = 316 and 338 keV. Moreover, this experiment uses an high efficiency BGO detector, which is segmented for the discrimination between signal and background events.",
    image: "/images/experiments/10B_alpha.jpeg",
  },
]

export async function generateStaticParams() {
  return experiments.map((exp) => ({
    id: exp.id.toString(),
  }))
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const id = resolvedParams.id
  const experiment = experiments.find((exp) => exp.id === parseInt(id))

  if (!experiment) {
    notFound()
  }

  const processedTitle = await processLatex(experiment.title)
  const processedContent = await processLatex(experiment.fullContent)

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={experiment.image}
            alt={experiment.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              <span dangerouslySetInnerHTML={{ __html: processedTitle }} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
          </CardContent>
        </Card>
      </article>
    </div>
  )
}
