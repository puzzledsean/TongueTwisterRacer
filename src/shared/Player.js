export class Player {
    constructor(username, score)  {
      this.username = username;
      this.score = score;
      this.UID = NaN;
    }

    setUID(UID) {
        this.UID = UID;
        
    }
}