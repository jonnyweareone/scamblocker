// UK Area Codes for ScamBlocker
export const UK_AREA_CODES = [
  { code: '020', name: 'London', region: 'Greater London' },
  { code: '0121', name: 'Birmingham', region: 'West Midlands' },
  { code: '0161', name: 'Manchester', region: 'Greater Manchester' },
  { code: '0113', name: 'Leeds', region: 'West Yorkshire' },
  { code: '0117', name: 'Bristol', region: 'South West' },
  { code: '0131', name: 'Edinburgh', region: 'Scotland' },
  { code: '0141', name: 'Glasgow', region: 'Scotland' },
  { code: '029', name: 'Cardiff', region: 'Wales' },
  { code: '0151', name: 'Liverpool', region: 'Merseyside' },
  { code: '0191', name: 'Newcastle', region: 'Tyne and Wear' },
  { code: '01273', name: 'Brighton', region: 'East Sussex' },
  { code: '01223', name: 'Cambridge', region: 'Cambridgeshire' },
  { code: '01865', name: 'Oxford', region: 'Oxfordshire' },
  { code: '023', name: 'Portsmouth / Southampton', region: 'Hampshire' },
  { code: '01392', name: 'Exeter', region: 'Devon' },
  { code: '01603', name: 'Norwich', region: 'Norfolk' },
];

export const getAreaCodeInfo = (code: string) => {
  return UK_AREA_CODES.find(ac => ac.code === code);
};
