export function experience(totalXP, maxXp, lvl, xpGained) {
  totalXP += xpGained;
  console.log(`You gained ${xpGained} XP! Total XP: ${totalXP}`);
  if (totalXP >= maxXp) {
    lvl++;
    console.log(`TADAAAAAAAAAAM !!!!\nYou lvl up !\nyour lvl: ${lvl}`);
    totalXP = 0;
  }
}
