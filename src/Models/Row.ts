export default class Row {
  round: string;
  qNumber: number;
  asnwer: string;
  teamInput: string;
  match: boolean;
  point: boolean;

  constructor(
      round: string,
      qNumber: number,
      asnwer: string,
      teamInput: string,
      match: boolean,
      point: boolean,
  ) {
    this.round = round;
    this.qNumber = qNumber;
    this.asnwer = asnwer;
    this.teamInput = teamInput;
    this.match = match;
    this.point = point;
  }

  
}