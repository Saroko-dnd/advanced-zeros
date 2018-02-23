const countPowers = (number, numberForExponentiation) => {
    let result = 0;
    let power = 1;
    let expResult = Math.pow(numberForExponentiation, power);

    while (expResult <= number) {
        result += Math.floor(number / expResult);
        ++power;
        expResult = Math.pow(numberForExponentiation, power);
    }

    return result;
};

const checkNumberForSimplicity = number => {
    let divisor = Math.floor(number ** (1 / 2));

    while (divisor > 1 && number % divisor) {
        --divisor;
    }

    return divisor === 1;
};

const addFactorToFactorsInfo = (factor, factorsInfoArray) => {
    let factorInfo;

    factorInfo = factorsInfoArray.find(
        foundFactor => foundFactor.value === factor
    );
    if (factorInfo) {
        ++factorInfo.power;
    } else {
        factorsInfoArray.push({ value: factor, power: 1 });
    }
};

module.exports = (number, base) => {
    const simpleFactors = [];
    let divisor = 2;
    let zeros;

    if (checkNumberForSimplicity(base)) {
        zeros = countPowers(number, base);
    } else {
        while (base > 3 && !checkNumberForSimplicity(base)) {
            while (base % divisor) {
                ++divisor;
            }

            base /= divisor;
            addFactorToFactorsInfo(divisor, simpleFactors);
            divisor = 2;
        }
        addFactorToFactorsInfo(base, simpleFactors);

        simpleFactors.forEach(foundFactor => {
            foundFactor.powersInNumber = countPowers(number, foundFactor.value);
            foundFactor.powersSumToPowerRatio =
                foundFactor.powersInNumber / foundFactor.power;
        });

        simpleFactors.sort(
            (factorA, factorB) =>
                factorA.powersSumToPowerRatio - factorB.powersSumToPowerRatio
        );

        zeros = simpleFactors[0].powersSumToPowerRatio;
        zeros = Math.floor(zeros);
    }

    return zeros;
};
