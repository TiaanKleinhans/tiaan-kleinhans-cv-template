import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

import Image from 'next/image';
import { UserDetailsConstant } from '@/constants/user-details';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AvailableTranslations } from '@/constants/locales';
import { Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { TRANSLATION_KEYS } from '@/constants/translations';

export default function HomePage() {
  const t = useTranslations();
  const user = UserDetailsConstant;
  const availableTranslations = AvailableTranslations;

  const downloadCv = (code: string) => {};

  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
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
      bg-[#233143]
    "
        />

        {/* TEXT IN HERO */}
        <div className="relative z-10 flex flex-col items-center text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-[2px_2px_0px_black]">
            {user.name}
            <br />
            {user.surname}
          </h1>
          <h2 className="mt-4 text-xl opacity-90">{t('INTRODUCTION.ROLE')}</h2>
        </div>
      </section>

      {/* FLOATING CARD FIXED + PREDICTABLE */}
      <div className="relative w-full flex justify-center -mt-24 z-20">
        <div className="w-[90%] md:w-[55%] bg-[#233143] p-12 rounded-lg shadow-2xl text-white text-center">
          <h2 className="opacity-90 mb-6">{t('CV.TITLE')}</h2>
          <h2 className="opacity-90 mb-6">{t('CV.HEADER')}</h2>

          <Dialog>
            <DialogTrigger className="border border-green-400 px-6 py-2 rounded text-green-400 hover:bg-green-400 hover:text-black transition">
              {t('CV.DOWNLOAD_CV')}
            </DialogTrigger>

            <DialogContent className="!bg-[#233143] !text-white">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-center">
                  {t('CV.MODAL.HEADER')}
                </DialogTitle>
              </DialogHeader>

              <DialogDescription>
                <Table>
                  <TableHeader>
                    <TableRow className="pt-2 pb-0 flex items-center justify-center">
                      <TableHead className="!text-white">{t('CV.MODAL.LANGUAGE')}</TableHead>
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
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* FLOATING CARD  */}

      <section className="relative w-full h-screen overflow-hidden">
        <Image
          src="/images/fibre-optic.jpg"
          alt="Bottom background"
          fill
          className="
    object-cover
    [mask-image:linear-gradient(to_top,black_80%,transparent)]
    bg-[#233143]
  "
        />
        <div className="relative z-20 mt-10 flex justify-center  flex-row ">
          <Card className="relative  flex justify-center bg-[#2d3b4d] text-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">My Stats</CardTitle>
              <CardDescription className="text-center text-gray-300">
                Visual overview below
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">Chart here</div>
            </CardContent>
          </Card>
          <Card className="relative flex justify-center bg-[#2d3b4d] text-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">My Stats</CardTitle>
              <CardDescription className="text-center text-gray-300">
                Visual overview below
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">Chart here</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );

  <section className="w-full bg-[#233143] py-24">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-white text-3xl font-bold mb-10 text-center">02 PROFESSIONAL METRICS</h2>
    </div>
  </section>;

  <Card className="bg-[#2d3b4d] text-white shadow-xl">
    <CardHeader>
      <CardTitle className="text-center">My Stats</CardTitle>
      <CardDescription className="text-center text-gray-300">Visual overview below</CardDescription>
    </CardHeader>
    <CardContent className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">Chart here</div>
    </CardContent>
  </Card>;
}
