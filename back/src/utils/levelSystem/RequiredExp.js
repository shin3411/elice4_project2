const RequiredExp = {
  "0": 50,
  "1": 300,
  "2": 700,
  "3": 1300,
  "4": 9999999,
  "5": Infinity,
};

let AccRequiredExp = {
    "-1": 0
};
let sum = 0;
for(const key in Object.keys(RequiredExp)){
    sum += RequiredExp[key];
    AccRequiredExp[key] = sum;
}

export { RequiredExp, AccRequiredExp };
