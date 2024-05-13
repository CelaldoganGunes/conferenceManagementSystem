module.exports = {
    testEnvironment: 'node', // Node.js ortamında testleri çalıştır
    testPathIgnorePatterns: ['/node_modules/'], // node_modules dizinindeki dosyaları test etme
    moduleNameMapper: {
      '^../service/(.*)$': '<rootDir>/service/$1',
      '^../model/(.*)$': '<rootDir>/model/$1',
      '^../controller/(.*)$': '<rootDir>/controller/$1'
    },
    // İhtiyaç duyulan diğer yapılandırmalar...
  };
  