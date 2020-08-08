import firebase from 'firebase';

class AnswerSnapshot {
  
  constructor(){
    this.allAnswers = null;
  }

  async getAnswerSnapshot() {
    const snapshot = await firebase.database().ref(`/answers/`).once('value');
    const answerSnapshot = snapshot.val(); //Array of Object
    console.log(answerSnapshot);
    this.answerSnapshot = answerSnapshot;
  }
  
}

// singleton
const  answerSnapshot = new AnswerSnapshot();
export default answerSnapshot;
