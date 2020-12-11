const getLetterCounts = str => {
  const plaintext = str.toLowerCase().replace(/[^a-z]/g, ""); 
  const counts = new Array(26).fill(0);
  let total = 0;

  for (let i = 0; i < plaintext.length; i++) {
    counts[plaintext.charCodeAt(i) - 97]++;
    total++;
  }

  return {counts, total};
}

const getIC = str => {
  const {counts, total} = getLetterCounts(str);

  const sum = counts.reduce((a, v) => a + v * (v - 1), 0);
  const ic = sum / (total * (total - 1));

  return ic;
}

const getCS = str => {
  const expected = [
    0.08167, //A
    0.01492, //B
    0.02782, //C
    0.04253, //D
    0.12702, //E
    0.02228, //F
    0.02015, //G
    0.06094, //H
    0.06966, //I
    0.00153, //J
    0.00772, //K
    0.04025, //L
    0.02406, //M
    0.06749, //N
    0.07507, //O
    0.01929, //P
    0.00095, //Q
    0.05987, //R
    0.06327, //S
    0.09056, //T
    0.02758, //U
    0.00978, //V
    0.02360, //W
    0.00150, //X
    0.01974, //Y
    0.00074  //Z
  ];
  const {counts, total} = getLetterCounts(str);

  const sum = counts.map((c, i) => Math.pow((c - total * expected[i]),2)/(total * expected[i])).reduce((a, v) => a + v);

  return sum;
}

const two = () => {
  const str = 'Yx`7cen7v7ergrvc~yp:|rn7OXE7t~g.re97R9p97~c7d.xb{s7cv|r7v7dce~yp75.r{{x7`xe{s57vys;7p~ary7c.r7|rn7~d75|rn5;7oxe7c.r7q~edc7{rccre75.57`~c.75|5;7c.ry7oxe75r57`~c.75r5;7c.ry75{57`~c.75n5;7vys7c.ry7oxe7yroc7t.ve75{57`~c.75|57vpv~y;7c.ry75x57`~c.75r57vys7dx7xy97Nxb7zvn7bdr7vy7~ysro7xq7tx~yt~srytr;7_vzz~yp7s~dcvytr;7\vd~d|~7rovz~yvc~xy;7dcvc~dc~tv{7crdcd7xe7`.vcrare7zrc.xs7nxb7qrr{7`xb{s7d.x`7c.r7urdc7erdb{c9';
  let result = {chi: Infinity};
  for (let i = 1; i < 128; i++) {
    const res = str.split('').map(c => String.fromCharCode(i ^ c.charCodeAt(0))).join('');
    const chi = getCS(res);

    // console.log({chi, i, res});
    if (chi < result.chi) result = {chi, i, res};
  }
  
  return result;
};

const threepointone = () => {
  let str = '1c41023f564b2a130824570e6b47046b521f3f5208201318245e0e6b40022643072e13183e51183f5a1f3e4702245d4b285a1b23561965133f2413192e571e28564b3f5b0e6b50042643072e4b023f4a4b24554b3f5b0238130425564b3c564b3c5a0727131e38564b245d0732131e3b430e39500a38564b27561f3f5619381f4b385c4b3f5b0e6b580e32401b2a500e6b5a186b5c05274a4b79054a6b67046b540e3f131f235a186b5c052e13192254033f130a3e470426521f22500a275f126b4a043e131c225f076b431924510a295f126b5d0e2e574b3f5c4b3e400e6b400426564b385c193f13042d130c2e5d0e3f5a086b52072c5c192247032613433c5b02285b4b3c5c1920560f6b47032e13092e401f6b5f0a38474b32560a391a476b40022646072a470e2f130a255d0e2a5f0225544b24414b2c410a2f5a0e25474b2f56182856053f1d4b185619225c1e385f1267131c395a1f2e13023f13192254033f13052444476b4a043e131c225f076b5d0e2e574b22474b3f5c4b2f56082243032e414b3f5b0e6b5d0e33474b245d0e6b52186b440e275f456b710e2a414b225d4b265a052f1f4b3f5b0e395689cbaa186b5d046b401b2a500e381d4b23471f3b4051641c0f2450186554042454072e1d08245e442f5c083e5e0e2547442f1c5a0a64123c503e027e040c413428592406521a21420e184a2a32492072000228622e7f64467d512f0e7f0d1a';
  str = str.match(/.{2}/g).map(e => parseInt(e, 16));

  // console.log(kek(str, 'K3k'));
  // return;

  const getNth = (k, b) => str.filter((c,i) => (i-b) % k === 0);
  const getLetterPercentage = (str) => str.toLowerCase().replace(/[^a-z,. ]/g, "").length / str.length;

  let i = 2;
  const lengths = [];

  for (i = 2; i < 20; i++) {
    const ics = Array(i).fill(null).map((e, j) => getIC(getNth(i, j).map(c => String.fromCharCode(c)).join('')));
    const ic = ics.reduce((a, v) => a + v) / ics.length;

    lengths.push({length: i, ic});
  }

  const maxIC = Math.max(...lengths.map(e => e.ic));
  const bestLength = lengths.sort((a, b) => b.ic - a.ic).filter(e => e.ic * 2 > maxIC).filter((e, _, arr) => !arr.some(s => e.length !== s.length && e.length % s.length === 0));

  const keylen = bestLength[0].length;

  const nestForEach = (depth, arr, curr, cb) => {
    if (depth === 0) cb(curr);
    else arr.forEach(e => nestForEach(depth - 1, arr, curr.concat(e), cb));
  };

  const getFromNths = arr => arr[0].flatMap((_, i) => arr.map(a => a[i]));

  const nths = Array.from(Array(keylen), (e, i) => getNth(keylen, i));
  let bestString = {str: '', key: '', chi: Infinity};

  // const dictionary = Array.from(Array(128), (e, i) => i);
  const dictionary = [...Array.from(Array(26), (e, i) => i+65), ...Array.from(Array(26), (e, i) => i+97), ...Array.from(Array(10), (e, i) => i+48)];

  nestForEach(keylen, dictionary, [], curr => {
    if (curr[1] === 65 && curr[2] === 65) console.log(curr.map(c => String.fromCharCode(c)).join(''));
    const str = getFromNths(nths.map((nth, i) => nth.map(c => String.fromCharCode(c ^ curr[i])))).join('');
    const chi = getCS(str);

    if (chi < bestString.chi && getLetterPercentage(str) > 0.95) bestString = {str, key: curr.map(c => String.fromCharCode(c)).join(''), chi};
  });

  return bestString;
};

console.log(two());
console.log(threepointone());
return;
