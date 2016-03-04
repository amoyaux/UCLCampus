var auditoriumsMarker = L.AwesomeMarkers.icon({
    prefix: "ion",
    icon: 'university',
    markerColor: 'blue'
});

var auditoriums = [
    {
        id: "AGOR",
        name: "Agora",
        pos: L.latLng(50.669040, 4.611950),
        address: "Place Agora 19"
      },
    {
        id: "BARB",
        name: "Sainte Barbe",
        pos: L.latLng(50.668178, 4.621446),
        address: "Place Sainte Barbe 1"
      },
    {
        id: "CORE",
        name: "Center for Operations Research and Econometrics",
        pos: L.latLng(50.668834, 4.615409),
        address: "Voie du Roman Pays 34"
      },
    {
        id: "COUB",
        name: "Coubertin",
        pos: L.latLng(50.670538, 4.606796),
        address: "Place Coubertin"
      },
    {
        id: "CYCL",
        name: "Cyclotron",
        pos: L.latLng(50.666175, 4.623584),
        address: "Chemin du Cyclotron 1"
      },
    {
        id: "DESC",
        name: "Descamps",
        pos: L.latLng(50.669444, 4.611214),
        address: "Grand-Place 45"
      },
    {
        id: "DUPR",
        name: "Dupriez",
        pos: L.latLng(50.668130, 4.611366),
        address: "Place Montesquieu 3"
      },
    {
        id: "DOYE",
        name: "Doyens",
        pos: L.latLng(50.66844, 4.61261),
        address: "Place des Doyens 1"
      },
    {
        id: "ERAS",
        name: "Erasme",
        pos: L.latLng(50.669618, 4.610401),
        address: "Place Blaise Pascal 1"
      },
    {
        id: "ESOP",
        name: "Institut des Langues Vivantes (ILV)",
        pos: L.latLng(50.669070, 4.614903),
        address: "Traverse d'Esope 1"
      },
    {
        id: "LAVO",
        name: "Lavoisier",
        pos: L.latLng(50.669184, 4.619182),
        address: "Place Louis Pasteur 1"
      },
    {
        id: "LECL",
        name: "Leclercq",
        pos: L.latLng(50.668006, 4.611857),
        address: "Place Montesquieu 1"
      },
    {
        id: "MCUR",
        name: "Marie Curie",
        pos: L.latLng(50.667736, 4.620695),
        address: "Rue du Compas 3"
      },
    {
        id: "MERC",
        name: "Mercator",
        pos: L.latLng(50.669249, 4.619493),
        address: "Place Louis Pasteur"
      },
    {
        id: "MONT",
        name: "Montesquieu",
        pos: L.latLng(50.66835, 4.61137),
        address: "Rue Montesquieu 32"
      },
    {
        id: "MORE",
        name: "Thomas More",
        pos: L.latLng(50.668018, 4.611323),
        address: "Place Montesquieu 2"
      },
    {
        id: "PCUR",
        name: "Pierre Curie",
        pos: L.latLng(50.668091, 4.620550),
        address: "Rue du Compas 1"
      },
    {
        id: "SCES",
        name: "Sciences",
        pos: L.latLng(50.668282, 4.619510),
        address: "Place des Sciences 2"
      },
    {
        id: "SOCR",
        name: "Socrate",
        pos: L.latLng(50.670164, 4.610792),
        address: "Place du Cardinal Mercier 10-12"
      },
    {
        id: "STUD",
        name: "Studio Agora",
        pos: L.latLng(50.669227, 4.612270),
        address: "Place Agora"
      },
    {
        id: "SUD",
        name: "Croix du Sud",
        pos: L.latLng(50.667010, 4.620630),
        address: "Place Croix du Sud"
      },
    {
        id: "VHEL",
        name: "Van Helmont",
        pos: L.latLng(50.669450, 4.619263),
        address: "Place Louis Pasteur 2"
      }
  ];