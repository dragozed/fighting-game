export const villageRequirementsCalculator = (
  buildingname: string,
  level: number
) => {
  let woodReq = 0;
  let stoneReq = 0;
  let ironReq = 0;

  if (buildingname === "TrainingGrounds") {
    //req for level 0 initialized in App.tsx
    if (level === 0) {
      //req for level 1
      woodReq = 10;
      stoneReq = 10;
      ironReq = 0;
    } else if (level === 1) {
      //req for level 2
      woodReq = 25;
      stoneReq = 25;
      ironReq = 5;
    } else if (level === 2) {
      //req for level 3
      woodReq = 50;
      stoneReq = 50;
      ironReq = 15;
    } else {
      //req for level 4
      woodReq = 999;
      stoneReq = 999;
      ironReq = 999;
    }
  }
  return {
    woodReq,
    stoneReq,
    ironReq,
  };
};
