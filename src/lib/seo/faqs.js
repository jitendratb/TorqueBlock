

export function getBikeFAQs(bike) {
  const name = `${bike?.bikeBrand || ""} ${bike?.bikeModel || ""}`.trim() || "your motorcycle";

  return [
    {
      question: `What are the standard tyre sizes for ${name}?`,
      answer: `The standard tyre fitment for ${name} typically uses Front standard size ${bike?.frontSizes?.[0] || "N/A"} and Rear standard size ${bike?.rearSizes?.[0] || "N/A"}.`,
    },
    {
      question: `How does tyre selection impact the performance of ${name}?`,
      answer: `Tyre choice heavily determines your ride safety. Installing premium rubbers optimizes cornering stability, wet-weather water dispersion, and shortens braking distances on the street or track.`,
    },
    {
      question: `Which tyre brands are best compatible with ${name}?`,
      answer: `High-performance models like the Pirelli Diablo/Angel series, Metzeler Sportec, and Michelin Road series are highly recommended for the geometry of ${name}.`,
    },
  ];
}

export function getCompareFAQs(compare) {
  const tyre1Name = compare?.tyre1?.productName || "Tyre 1";
  const tyre2Name = compare?.tyre2?.productName || "Tyre 2";

  return [
    {
      question: `What is the primary difference between ${tyre1Name} and ${tyre2Name}?`,
      answer: `The main differences lie in their performance grade and tread design. ${tyre1Name} is optimized for ${compare?.tyre1?.best_use_case?.[0] || "sport-touring longevity"}, whereas ${tyre2Name} is tailored for ${compare?.tyre2?.best_use_case?.[0] || "maximum aggressive cornering grip"}.`,
    },
    {
      question: `Can I fit either ${tyre1Name} or ${tyre2Name} on the same wheel size?`,
      answer: `Yes, provided their sizes match your bike's standard sizing. Please compare their standard front and rear sizing tables shown in our specifications comparison sections.`,
    },
    {
      question: `Which of these compared tyres lasts longer?`,
      answer: `Typically, sport-touring compounds have harder center rubber zones to deliver higher overall mileage, while hypersport compounds prioritize track cornering grip over total tyre lifespan.`,
    },
  ];
}

export function getBlogFAQs(blog) {
  return [
    {
      question: "How often should I inspect my motorcycle tyre tread?",
      answer: "It is recommended to inspect tyre tread depth and pressure weekly. Replace tyres immediately if the tread depth drops below the wear indicators, or if you spot cracks or uneven tyre scaling.",
    },
    {
      question: "How do premium tyres improve superbike safety?",
      answer: "Premium tyres utilize zero-degree steel belt tensioning and high-silica chemistry to offer massive braking stability, preventing slips in rainy conditions or during aggressive high-speed acceleration.",
    },
  ];
}
