const getLogoUrlByTeam = (id) => {
  const path = "/global/2022-2023/team-logo/";

  switch (id) {
    case "Rytieri":
      return `${path}spisski-rytieri.png`;
    case "Lučenec":
      return `${path}bkm-lucenec.png`;
    case "Patrioti":
      return `${path}levicki-patrioti.png`;
    case "Prievidza":
      return `${path}bc-prievidza.png`;
    case "Handlová":
      return `${path}mbk-handlova.png`;
    case "Inter":
      return `${path}inter-bratislava.png`;
    case "Komárno":
      return `${path}bc-komarno.png`;
    case "Svit":
      return `${path}bk-iskra-svit.png`;
    case "Rožňava":
      return `${path}bk-spd-roznava.png`;
    default:
      return "";
  }
};

export default getLogoUrlByTeam;
