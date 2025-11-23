import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

import Image from 'next/image';
import { UserDetailsConstant } from '@/constants/user-details';
// import { TRANSLATION_KEYS } from '@/constants/translations';

export default function HomePage() {
  const t = useTranslations();
  const user = UserDetailsConstant;

  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}

      <section className="relative w-full h-screen overflow-hidden">
        <Image
          src="/images/DSC00295.jpg"
          alt="Top background"
          fill
          className="
    object-cover
    [mask-image:linear-gradient(to_bottom,black_80%,transparent)]
    bg-[#233143]
  "
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold">
            {t('INTRODUCTION.I_AM')}
            <br />
            {user.name}
            <br />
            {user.surname}
          </h1>
          <p className="mt-4 text-xl opacity-90">{t('INTRODUCTION.ROLE')}</p>
        </div>
      </section>

      {/* FLOATING CARD FIXED PROPERLY */}
      <div className="absolute w-full top-[83vh] flex justify-center z-20">
        <div className="w-[90%] md:w-[55%] bg-[#233143] p-12 rounded-lg shadow-2xl text-white text-center">
          {/* <div className="w-12 h-12 rounded-full border border-green-400 flex items-center justify-center text-green-400 mx-auto mb-6">
            Need A Hard Copy?
          </div> */}

          <p className="opacity-90 mb-6">{t('CV.TITLE')}</p>
          <p className="opacity-90 mb-6">{t('CV.HEADER')}</p>

          <button className="border border-green-400 px-6 py-2 rounded text-green-400 hover:bg-green-400 hover:text-black transition">
            {t('CV.DOWNLOAD_CV')}
          </button>
        </div>
      </div>

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

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[4px]">01 PROFESSIONAL</h2>
          <p className="mt-2 text-lg opacity-90">MY KNOWLEDGE LEVEL IN SOFTWARE</p>
        </div>
      </section>
    </div>
  );

  // return (
  //   // Main container: full height, vertical flex layout, and relative for positioning the modal
  //   <div className="relative flex flex-col min-h-screen bg-gray-50">
  //     {/* 1. TOP IMAGE SECTION */}
  //     {/* The height is increased slightly to give space for the modal to overlap */}
  //     <div className="relative w-full h-[50vh] overflow-hidden">
  //       <Image
  //         src="/images/fibre-optic.jpg"
  //         alt="Top background image"
  //         fill
  //         priority
  //         style={{ objectFit: 'cover' }}
  //       />
  //     </div>

  //     {/* 2. CENTRAL CONTENT SECTION (The seamless modal - ABSOLUTELY POSITIONED) */}
  //     {/* - absolute: Takes it out of the flow.
  //         - top-1/2: Positions the top edge at 50% down the container.
  //         - left-1/2: Positions the left edge at 50% across the container.
  //         - -translate-x-1/2 -translate-y-1/2: Centers the block perfectly.
  //         - max-w-4xl: Responsive width cap.
  //     */}
  //     <div
  //       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
  //                     w-11/12 max-w-4xl p-8 bg-white rounded-xl shadow-2xl text-center z-10
  //                     md:w-3/4 lg:w-2/3"
  //     >
  //       <h2 className="text-3xl font-bold text-gray-800 mb-4">Seamless Text Area</h2>
  //       <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
  //         This block now floats directly over the background transition, making the images touch!
  //       </p>

  //       <textarea
  //         placeholder="Start writing here..."
  //         rows={8}
  //         className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700 resize-y"
  //       />

  //       <a
  //         href="files/aus-cv-test.zip" // Use the path relative to the public folder
  //         download // Tells the browser to download the file
  //         className="inline-block mt-8 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
  //       >
  //         Download Resume
  //       </a>
  //     </div>

  //     {/* 3. BOTTOM IMAGE SECTION */}
  //     {/* The second image starts immediately after the first, fulfilling the "touch" requirement */}
  //     <div className="relative w-full h-[50vh] overflow-hidden">
  //       <Image
  //         src="/images/progress-mountain.jpg"
  //         alt="Bottom background image"
  //         fill
  //         style={{ objectFit: 'cover' }}
  //       />
  //     </div>
  //   </div>
  // );
}

// return (
//   <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
//     <LanguageSwitcher />
//     <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t('INTRODUCTION.ROLE')}</h1>
//     <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
//       {t('INTRODUCTION.DISCOVER_MY_SKILL')}
//     </p>
//     <nav style={{ marginTop: '2rem' }}>
//       <ul
//         style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
//       >
//         <li>
//           <a href="#home" style={{ textDecoration: 'none', color: 'inherit' }}>
//             {t('MENU_ITEMS.HOME')}
//           </a>
//         </li>
//         <li>
//           <a href="#experience" style={{ textDecoration: 'none', color: 'inherit' }}>
//             {t('MENU_ITEMS.EXPERIENCE')}
//           </a>
//         </li>
//         <li>
//           <a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>
//             {t('MENU_ITEMS.CONTACT')}
//           </a>
//         </li>
//       </ul>
//     </nav>
//   </main>
// );
//}

// import { getDictionary, Locale } from '@/lib/dictionaries/translation-dictionary';
// import Image from 'next/image';

// interface LandingPageParams {
//   params: {
//     locale: Locale;
//   };
// }

// export default async function LandingPage({ params: { locale } }: LandingPageParams) {
//   const translationService = await getDictionary(locale);

//   return (
//     // Main container: full height, vertical flex layout, and relative for positioning the modal
//     <div className="relative flex flex-col min-h-screen bg-gray-50">
//       {/* 1. TOP IMAGE SECTION */}
//       {/* The height is increased slightly to give space for the modal to overlap */}
//       <div className="relative w-full h-[50vh] overflow-hidden">
//         <Image
//           src="/images/fibre-optic.jpg"
//           alt="Top background image"
//           fill
//           priority
//           style={{ objectFit: 'cover' }}
//         />
//       </div>

//       {/* 2. CENTRAL CONTENT SECTION (The seamless modal - ABSOLUTELY POSITIONED) */}
//       {/* - absolute: Takes it out of the flow.
//           - top-1/2: Positions the top edge at 50% down the container.
//           - left-1/2: Positions the left edge at 50% across the container.
//           - -translate-x-1/2 -translate-y-1/2: Centers the block perfectly.
//           - max-w-4xl: Responsive width cap.
//       */}
//       <div
//         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
//                       w-11/12 max-w-4xl p-8 bg-white rounded-xl shadow-2xl text-center z-10
//                       md:w-3/4 lg:w-2/3"
//       >
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">Seamless Text Area</h2>
//         <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//           This block now floats directly over the background transition, making the images touch!
//         </p>

//         <textarea
//           placeholder="Start writing here..."
//           rows={8}
//           className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700 resize-y"
//         />

//         <a
//           href="files/aus-cv-test.zip" // Use the path relative to the public folder
//           download // Tells the browser to download the file
//           className="inline-block mt-8 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
//         >
//           Download Resume
//         </a>
//       </div>

//       {/* 3. BOTTOM IMAGE SECTION */}
//       {/* The second image starts immediately after the first, fulfilling the "touch" requirement */}
//       <div className="relative w-full h-[50vh] overflow-hidden">
//         <Image
//           src="/images/progress-mountain.jpg"
//           alt="Bottom background image"
//           fill
//           style={{ objectFit: 'cover' }}
//         />
//       </div>
//     </div>
//   );
// }
