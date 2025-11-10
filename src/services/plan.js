// src/services/plan.js

export const plan = [
  // Romanos (16 capítulos)
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `romanos-${i + 1}`,
    book: "Romanos",
    chapterNumber: i + 1,
    read: false,
  })),

  // 1 Coríntios (16 capítulos)
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `1corintios-${i + 1}`,
    book: "1 Coríntios",
    chapterNumber: i + 1,
    read: false,
  })),

  // 2 Coríntios (13 capítulos)
  ...Array.from({ length: 13 }, (_, i) => ({
    id: `2corintios-${i + 1}`,
    book: "2 Coríntios",
    chapterNumber: i + 1,
    read: false,
  })),

  // Gálatas (6 capítulos)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `galatas-${i + 1}`,
    book: "Gálatas",
    chapterNumber: i + 1,
    read: false,
  })),

  // Efésios (6 capítulos)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `efesios-${i + 1}`,
    book: "Efésios",
    chapterNumber: i + 1,
    read: false,
  })),

  // Filipenses (4 capítulos)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `filipenses-${i + 1}`,
    book: "Filipenses",
    chapterNumber: i + 1,
    read: false,
  })),

  // Colossenses (4 capítulos)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `colossenses-${i + 1}`,
    book: "Colossenses",
    chapterNumber: i + 1,
    read: false,
  })),

  // 1 Tessalonicenses (5 capítulos)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `1tessalonicenses-${i + 1}`,
    book: "1 Tessalonicenses",
    chapterNumber: i + 1,
    read: false,
  })),

  // 2 Tessalonicenses (3 capítulos)
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `2tessalonicenses-${i + 1}`,
    book: "2 Tessalonicenses",
    chapterNumber: i + 1,
    read: false,
  })),

  // 1 Timóteo (6 capítulos)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `1timoteo-${i + 1}`,
    book: "1 Timóteo",
    chapterNumber: i + 1,
    read: false,
  })),

  // 2 Timóteo (4 capítulos)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `2timoteo-${i + 1}`,
    book: "2 Timóteo",
    chapterNumber: i + 1,
    read: false,
  })),

  // Tito (3 capítulos)
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `tito-${i + 1}`,
    book: "Tito",
    chapterNumber: i + 1,
    read: false,
  })),

  // Filemom (1 capítulo)
  {
    id: "filemom-1",
    book: "Filemom",
    chapterNumber: 1,
    read: false,
  },
];
