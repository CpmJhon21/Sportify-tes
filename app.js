
import axios from 'axios';
import CryptoJS from 'crypto-js';

const spotify = {
  dl: async function(link) {
    return this.submit(link);
  },

  generateToken: function(e, t = "neoxr") {
    const vn = CryptoJS;
    const Bg = 256;
    const Dg = 128;
    const Sg = 100;
    
    const r = vn.lib.WordArray.random(16);
    const n = vn.PBKDF2(t, r, { keySize: Bg / 32, iterations: Sg });
    const o = vn.lib.WordArray.random(Dg / 8);
    const a = vn.AES.encrypt(e, n, { iv: o, padding: vn.pad.Pkcs7, mode: vn.mode.CBC });
    
    return r.toString() + o.toString() + a.toString();
  },

  generateJWT: function(payload, secret) {
    const header = {
      alg: "HS256",
      typ: "JWT"
    };
    
    const enc = (segment) => 
      CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(segment)))
        .replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    
    const encx = enc(header);
    const encxx = enc(payload);
    
    const signature = CryptoJS.HmacSHA256(encx + "." + encxx, secret);
    const encSign = CryptoJS.enc.Base64.stringify(signature)
      .replace(/=+$/, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
    
    return `${encx}.${encxx}.${encSign}`;
  },

  submit: async function(link) {
    const jwtPayload = {
      create: Date.now(),
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 300 
    };
    
    const jwt = this.generateJWT(jwtPayload, 'daffa875');

    const token = this.generateToken(link);
  
    try {
      const response = await axios.post("https://api.ssspotify.buzz/v1/ajax", JSON.stringify({ q: link }), {
        headers: {
          'authority': 'api.ssspotify.buzz',
          'accept': 'application/json, text/plain, */*',
          'authorization': `Bearer ${jwt}`,
          'content-type': 'application/json',
          'origin': 'https://ssspotify.buzz',
          'referer': 'https://ssspotify.buzz/',
          'user-agent': 'Postify/1.0.0',
          'x-api-token': token
        }
      });
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export { spotify };
