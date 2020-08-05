export default class Row {
  round: string;
  qNumber: number;
  asnwer: string;
  teamAnswer: string;
  match: boolean;
  point: boolean;

  constructor(
      roundNum: string,
      roundName: string,
      qNumber: number,
      asnwer: string,
      teamInput: string,
      match: boolean,
      point: boolean,
  ) {
    this.round = roundNum;
    this.qNumber = qNumber;
    this.asnwer = asnwer;
    this.teamAnswer = teamInput;
    this.match = match;
    this.point = point;
  }

  
}