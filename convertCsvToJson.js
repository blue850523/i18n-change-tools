const fs = require('fs');
const csvParse = require('csv-parse/lib/sync'); // 請確保安裝了csv-parse庫

const csvData = fs.readFileSync('data.csv', 'utf-8');
const records = csvParse(csvData, {
    columns: true,
    skip_empty_lines: true,
});

const i18nData = {
    us: {},
    cn: {},
    hk: {},
};

records.forEach(record => {
    const key = record['key'];
    i18nData.us[key] = record['en_US'] || '';
    i18nData.cn[key] = record['zh_CN'] || '';
    i18nData.hk[key] = record['zh_HK'] || '';
});

// 生成i18n語言文件
fs.writeFileSync('i18n/en-US.json', JSON.stringify(i18nData.us, null, 2));
fs.writeFileSync('i18n/zh-CN.json', JSON.stringify(i18nData.cn, null, 2));
fs.writeFileSync('i18n/zh-HK.json', JSON.stringify(i18nData.hk, null, 2));