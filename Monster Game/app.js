function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      isUsed: false,
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
      minusMonsterHealth: 0,
      minusPlayerHealth: 0,
    };
  },
  computed: {
    isDie(){
      return (this.playerHealth <= 0 || this.monsterHealth <= 0);
    },
    gameOver(){
      if (this.playerHealth == 0){
        this.winner = "monster";
      }
      return this.winner;
    },

  },
  methods: {
    startGame(){
      location.reload();
    },
    commitSuicide(){
      this.playerHealth = 0;
    },
    attack(){
      this.logMessages.push({user:this.userAttacked(8,15), monster: this.monsterAttacked(5,12)});
      this.increaseNumberofClick();
    },

    // Player-----------------
    userAttacked(min,max){
      this.minusPlayerHealth = getRandomValue(min,max);
      if (this.playerHealth >=0 && this.minusPlayerHealth <= this.playerHealth){
        this.playerHealth -= this.minusPlayerHealth;
      }else{
        this.playerHealth = 0;
      }
      return this.minusPlayerHealth;
    },

    // Monster-------------------
    monsterAttacked(min,max){
      this.minusMonsterHealth = getRandomValue(min,max);
      if (this.monsterHealth >= 0 && this.minusMonsterHealth <= this.monsterHealth){
        this.monsterHealth -= this.minusMonsterHealth;
      }else{
        this.monsterHealth = 0;
      }
      return this.minusMonsterHealth;
    },

    increaseNumberofClick(){
      if (this.isUsed){
        this.currentRound += 1;
      }
      if(this.currentRound == 2){
        this.isUsed = false;
        this.currentRound = 0;
      }
    },
    specialAttack(){
      this.isUsed = true;
      this.logMessages.push({user:this.userAttacked(5,12), monster: this.monsterAttacked(8,25)});
      
    },
    healt(){
      this.increaseNumberofClick();
      if (this.playerHealth < 90){
        this.playerHealth += getRandomValue(5,12);
        this.logMessages.push({heal:getRandomValue(5,12), monster:this.userAttacked(5,15)});
        // this.userAttacked(5,15);
        console.log(this.logMessages);
      }
    }
  },
});

app.mount("#game");
