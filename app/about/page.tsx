import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
        {/* Cover Image */}
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src="/images/LUNA_collab-3.jpg"
            alt="LUNA Collaboration Team"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Page Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">About LUNA</h1>
          <p className="text-xl text-muted-foreground">Understanding the stars from deep underground</p>
        </header>

        {/* Mission Section */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nuclear fusion reactions produce most of the energy irradiated by stars and are responsible for the synthesis of the elements in the Universe. In fact, through a complex network of nuclear reactions, stars forge most of the elements observed in the Universe starting from primordial hydrogen and helium left from the Big Bang. In addition, nuclear reactions determine stellar evolution and the flux of stellar neutrinos.
              </p>
              <p className="text-muted-foreground">
                At typical astrophysical temperatures, nuclear fusion reactions can only take place in a relatively narrow energy window, called the Gamow peak. In most cases, such energy region lies far below the Coulomb repulsion barrier. As a consequence, fusion cross sections drop exponentially with decreasing energy, to the point that it takes millions or even billions particle collisions to give rise to a single fusion reaction. These extremely low cross sections are often inaccessible in laboratories at the Earths surface, because the expected counting rate is much smaller than the background in a detector.
              </p>
              <p className="text-muted-foreground">
                In 1991, the LUNA collaboration proposed a new, pioneering approach to nuclear astrophysics, that allowed to study a number of crucial nuclear reactions of astrophysical interest thanks to the extremely low background at LNGS.
              </p>
              <p className="text-muted-foreground">
                The experiment started with a homemade 50 kV accelerator, installed in the underground facilities of LNGS in 1993 and operating until 2003. The LUNA-50 kV accelerator has been the working horse for the LUNA measurements on 3He(3He,2p)4He and the D(p,γ)3He experiments.
              </p>
              <p className="text-muted-foreground">
                Since 2001, the LUNA experiment is equipped with a 400 kV accelerator and in the future a new 3.5 MV machine will be installed.
              </p>
              <p className="text-muted-foreground">
                Over the last decades, LUNA has provided valuable contribution to our present understanding of primordial nucleosynthesis, as well as stellar hydrogen and helium burning:
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Vision Section */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We envision a future where scientific breakthroughs are accelerated through open collaboration, shared
                resources, and interdisciplinary approaches. SciCollab aims to be the catalyst for this new era of
                scientific discovery, breaking down barriers between disciplines and institutions to foster innovation
                and progress.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe that the best scientific advancements come from diverse minds working together.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We encourage creative thinking and novel approaches to scientific problems.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We uphold the highest standards of scientific integrity and ethical research practices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Openness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We promote open science and the free exchange of ideas and data.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Join Us Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Join Us</h2>
          <p className="text-muted-foreground mb-4">
            Are you passionate about scientific discovery and collaboration? Join our growing community of researchers,
            scientists, and innovators. Together, we can push the boundaries of human knowledge and make groundbreaking
            discoveries.
          </p>
          <p className="text-muted-foreground">
            Contact us to learn more about how you can be a part of SciCollab and contribute to the future of science.
          </p>
        </section>
      </article>
    </div>
  )
}

