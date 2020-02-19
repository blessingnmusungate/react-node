const url = new URL('/fetch_user?foo=bn@gmail.com&bar=2');
const params = new URLSearchParams(url.search);

console.log(params.get('foo'))