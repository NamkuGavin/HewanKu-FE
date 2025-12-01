export class AnimalCategory {
  constructor({ id, name, unit, image }) {
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.image = image;
  }
}

export class AnimalAdopsiCategory {
  constructor({ id, name, activeIcon, icon }) {
    this.id = id;
    this.name = name;
    this.activeIcon = activeIcon;
    this.icon = icon;
  }
}
