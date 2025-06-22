// Базовий клас для елементів мережі
class NetworkElement {
  getPower(daytime) {
    return 0;
  }
}

class PowerPlant extends NetworkElement {
  constructor(powerMW) {
    super();
    this.powerMW = powerMW;
  }

  getPower(daytime) {
    return this.powerMW;
  }
}

class SolarPanel extends NetworkElement {
  constructor(powerMWPerDay) {
    super();
    this.powerMWPerDay = powerMWPerDay;
  }

  getPower(daytime) {
    return daytime ? this.powerMWPerDay : 0;
  }
}

class ResidentialBuilding extends NetworkElement {
  constructor(apartments) {
    super();
    this.apartments = apartments;
  }

  getPower(daytime) {
    return -this.apartments * (daytime ? 0.004 : 0.001); // якщо день то перше значення, а якщо ніч то друге значення
  }
}

class PowerLine {
  constructor(capacityMW, pricePerMW) {
    this.capacityMW = capacityMW;
    this.pricePerMW = pricePerMW;
  }
}

function calculateEnergy(elements, powerLines, daytime) {
  let totalPower = 0;
  for (let el of elements) {
    totalPower += el.getPower(daytime);
  }

  let output = "\n" + (daytime ? "ДЕНЬ" : "НІЧ") + " \n";
  output += `Загальний баланс: ${totalPower.toFixed(3)} МВт\n`;

  if (totalPower < 0) {
    let need = -totalPower;
    let cost = 0;
    powerLines.sort((a, b) => a.pricePerMW - b.pricePerMW);
    for (let line of powerLines) {
      let taken = Math.min(need, line.capacityMW);
      cost += taken * line.pricePerMW;
      need -= taken;
      if (need <= 0) break;
    }
    output += `Потрібно купити: ${(-totalPower).toFixed(3)} МВт\n`;
    output += `Загальна вартість закупки: ${cost.toFixed(2)} грн.\n`;
  } else if (totalPower > 0) {
    let surplus = totalPower;
    let income = 0;
    powerLines.sort((a, b) => b.pricePerMW - a.pricePerMW);
    for (let line of powerLines) {
      let send = Math.min(surplus, line.capacityMW);
      income += send * line.pricePerMW;
      surplus -= send;
      if (surplus <= 0) break;
    }
    output += `Можна продати: ${totalPower.toFixed(3)} МВт\n`;
    output += `Очікуваний прибуток: ${income.toFixed(2)} грн.\n`;
  } else {
    output += "Баланс нульовий, додаткові дії не потрібні.\n";
  }

  document.getElementById("output").textContent += output;
}

function simulateEnergy() {
  document.getElementById("output").textContent = "";
  let elements = [
    new PowerPlant(50),
    new SolarPanel(5),
    new SolarPanel(3),
    new ResidentialBuilding(200),
    new ResidentialBuilding(150)
  ];

  let powerLines = [
    new PowerLine(30, 100),
    new PowerLine(20, 80),
    new PowerLine(50, 120)
  ];

  calculateEnergy(elements, powerLines, true);
  calculateEnergy(elements, powerLines, false);
}
