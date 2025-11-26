'use client';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

import Image from 'next/image';
import { UserDetailsConstant } from '@/constants/user-details';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AvailableTranslations } from '@/constants/locales';
import { Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartCard } from '@/components/ui/chart-card';
import { ReusableRadarChart } from '@/components/ui/radar-chart';
import { motion } from 'framer-motion';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import {
  CorePersonalQualitiesConstant,
  CoreProfessionalCompetenciesConstant,
} from '@/constants/chart-data';
// import { TRANSLATION_KEYS } from '@/constants/translations';

export default function HomePage() {
  const translate = useTranslations();
  const user = UserDetailsConstant;
  const availableTranslations = AvailableTranslations;
  const personalQualitiesConstant = CorePersonalQualitiesConstant.map((_) => ({
    key: translate(_.key),
    value: _.value,
  }));

  const professionalCompetencies = CoreProfessionalCompetenciesConstant.map((_) => ({
    key: translate(_.key),
    value: _.value,
  }));

  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}

      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <Image
          src="/images/intro-me.png"
          alt="Top background"
          fill
          className="
      opacity-95
      object-cover
      [mask-image:linear-gradient(to_bottom,black_80%,transparent)]
      bg-[var(--primary)]
    "
        />

        {/* TEXT IN HERO */}
        <div className="relative z-10 flex flex-col items-center text-center text-white">
          <ScrollAnimation>
            <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-[2px_2px_0px_black]">
              {user.name}
              <br />
              {user.surname}
            </h1>
            <h2 className="mt-4 text-xl opacity-90">{translate('INTRODUCTION.ROLE')}</h2>
          </ScrollAnimation>
        </div>
      </section>

      {/* FLOATING CARD FIXED + PREDICTABLE */}

      {/* <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      > */}

      <ScrollAnimation>
        <div className="relative w-full flex justify-center -mt-24 z-20">
          <div className="w-[90%] md:w-[55%] bg-[var(--primary)] p-12 rounded-lg shadow-2xl text-white text-center">
            <h2 className="opacity-90 mb-6">{translate('CV.TITLE')}</h2>
            <h2 className="opacity-90 mb-6">{translate('CV.HEADER')}</h2>

            <Dialog>
              <ScrollAnimation animateOnce={false}>
                <DialogTrigger className="border border-green-400 px-6 py-2 rounded text-green-400 hover:bg-green-400 hover:text-black transition">
                  {translate('CV.DOWNLOAD_CV')}
                </DialogTrigger>
              </ScrollAnimation>

              <DialogContent className="!bg-[var(--primary)] !text-white">
                {/* <DialogContent className="!bg-[#233143] !text-white"> */}
                <ScrollAnimation delay={0.2}>
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-center">
                      {translate('CV.MODAL.HEADER')}
                    </DialogTitle>
                  </DialogHeader>
                </ScrollAnimation>

                <ScrollAnimation delay={0.4}>
                  <Table>
                    <TableHeader>
                      <TableRow className="pt-2 pb-0 flex items-center justify-center">
                        <TableHead className="!text-white">
                          {translate('CV.MODAL.LANGUAGE')}
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {availableTranslations.map((_, index) => (
                        <TableRow
                          key={_.code}
                          className="border-b border-gray-300 hover:bg-gray-900 cursor-pointer"
                        >
                          <TableCell className="flex items-center justify-center font-medium">
                            <a href={`files/${_.code}.zip`} download>
                              {_.name}
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollAnimation>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </ScrollAnimation>
      {/* </motion.div> */}

      {/* FLOATING CARD  */}

      <section className="relative w-full h-screen overflow-hidden">
        <Image
          src="/images/fibre-optic.jpg"
          alt="Bottom background"
          fill
          className="
    object-cover
    [mask-image:linear-gradient(to_top,black_80%,transparent)]
   
  "
        />

        {/* Chart Cards */}
        {/* <div className="relative gap-4 z-20 mt-10 flex flex-wrap justify-center">
          <ChartCard title="TRANSLATION Please" className="w-[90%] md:w-1/2 lg:w-1/2">
            <ReusableRadarChart
              data={data}
              angleKey="work"
              dataKey="workValue"
              radiusDomain={[0, 10]}
              strokeColor="#82a6aa"
              fillColor="#82a6aa"
            />
          </ChartCard>

          <ChartCard title="TRANSLATION Please" className="w-[90%] md:w-1/2 lg:w-1/2">
            <ReusableRadarChart
              data={data}
              angleKey="personality"
              dataKey="personalityValue"
              radiusDomain={[0, 10]}
              strokeColor="#82a6aa"
              fillColor="#82a6aa"
            />
          </ChartCard>

          <ChartCard title="Another Card" className="w-full md:w-1/2 lg:w-1/3">
            <div>Chart here</div>
          </ChartCard>
        </div> */}

        <ScrollAnimation animateOnce={false}>
          <div className="relative z-20 mt-10 flex flex-wrap justify-center gap-4 sm:gap-4">
            <ChartCard
              title={translate('CHARTS.CORE_PROFESSIONAL_COMPETENCIES.TITLE')}
              className="w-[80%] sm:w-[48%] lg:w-[42%]"
            >
              <ReusableRadarChart
                data={professionalCompetencies}
                angleKey="key"
                dataKey="value"
                radiusDomain={[0, 10]}
                strokeColor="var(--white)"
                fillColor="var(--white)"
              />
            </ChartCard>

            <ChartCard
              title={translate('CHARTS.CORE_PERSONAL_QUALITIES.TITLE')}
              className="w-[80%] sm:w-[48%] lg:w-[42%]"
            >
              <ReusableRadarChart
                data={personalQualitiesConstant}
                angleKey="key"
                dataKey="value"
                radiusDomain={[0, 10]}
                strokeColor="var(--white)"
                fillColor="var(--white)"
              />
            </ChartCard>
          </div>
        </ScrollAnimation>

        {/* Chart Cards */}
      </section>
    </div>
  );

  <section className="w-full bg-[var(--primary)] py-24">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-white text-3xl font-bold mb-10 text-center">02 PROFESSIONAL METRICS</h2>
    </div>
  </section>;
}
