const memoizer = fn => {
  const cache = new Map();

  return (...args) => {
    // serializa o array args
    const key = JSON.stringify(args);
    // verifica se a chave existe
    if (cache.has(key)) {
      console.log(`Buscou do cache ${args}`);
      // retorna o valor do cache
      return cache.get(key);
    } else {
      console.log(`Não encontrou no cache ${args}. Adicionando ao cache.`);
      // invoca a função fn com os parâmetros
      // utilizando o spread operator
      const result = fn(...args);
      // guarda o resultado no cache
      cache.set(key, result);
      // retorna o valor que acabou de ser calculado
      return result;
    }
  };
};

// função memoizer omitida
const sumTwoNumbers = (num1, num2) => num1 + num2;
// turbina a função sumTwoNumbers
const memoizedSumTwoNumbers = memoizer(sumTwoNumbers);

console.log(memoizedSumTwoNumbers(5,5));
console.log(memoizedSumTwoNumbers(7,2));
console.log(memoizedSumTwoNumbers(3,3));

// a combinação de parâmetros já foi usada antes
console.log(memoizedSumTwoNumbers(5,5)); // busca do cache

// recebe um objeto e um array
const getDiscount = (product, discounts) => discounts.get(product.id);

// descontos de um produto
const discounts = new Map();
discounts.set(1, 5);
discounts.set(2, 10);
discounts.set(3, 5);

// turbinou a função getDiscount
const memoizedGetDiscount = memoizer(getDiscount);

const result1 = memoizedGetDiscount(
  { id: 1, name: 'Cangaceiro JavaScript'}, 
  discounts
);
console.log(result1);

// buscou do cache
const result2 = memoizedGetDiscount(
  { id: 1, name: 'Cangaceiro JavaScript'}, 
  discounts
);
console.log(result2);

const factorial = n => {
  if(n <= 1) return 1
  return n * factorial(--n);
};
const memoizedFactorial = memoizer(factorial);

console.log(memoizedFactorial(5));
console.log(memoizedFactorial(3));
console.log(memoizedFactorial(4));

const factorial = memoizer(
n => {
  if (n <= 1) return 1;
  return n * factorial(--n);
}
);
console.log(factorial(5));
console.log(factorial(3));
console.log(factorial(4));

// handler da resposta
const fetchHandler = res => 
  res.ok ? res.json() : Promise.reject(res.statusText)

// retorna uma Promise
const getNotaFromId = id =>
  fetch(`http://localhost:3000/notas/${id}`)
  .then(fetchHandler);

// código anterior omitido
getNotaFromId(1) // busca da API
  .then(console.log) 
  .then(getNotaFromId(1)) // busca da API
  .then(console.log)
  .catch(console.log);

// código anterior omitido
const memoizedGetNotaFromId = memoizer(getNotaFromId);
memoizedGetNotaFromId(1) // busca da API
  .then(console.log) 
  .then(memoizedGetNotaFromId(1)) // busca do cache!
  .then(console.log)
  .catch(console.log);

const memoizer = fn => {
  const cache = new Map();
  const newFn = (...args) => {
    const key = JSON.stringify(args);
    if(cache.has(key)) return cache.get(key);        
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
  newFn.clearCache = () => cache.clear();
  return newFn;
};

// código anterior omitido
const memoizedGetNotaFromId = memoizer(getNotaFromId);
memoizedGetNotaFromId(1) // busca da API
  .then(console.log) 
  .then(memoizedGetNotaFromId.clearCache()) // apagou o cache
  .then(memoizedGetNotaFromId(1)) // busca do API!
  .then(console.log)
  .catch(console.log);
  
// função memoizer omitida
const sumTwoNumbers = (num1, num2) => num1 + num2;
const memoizedSumTwoNumbers = memoizer(sumTwoNumbers);

console.log(memoizedSumTwoNumbers(5,5));
console.log(memoizedSumTwoNumbers(7,2));
console.log(memoizedSumTwoNumbers(3,3));
memoizedSumTwoNumbers.clearCache();
console.log(memoizedSumTwoNumbers(5,5)); // calcula novamente!
console.log(memoizedSumTwoNumbers(5,5)); // buscou do cache
