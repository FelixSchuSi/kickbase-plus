export function getTeamLogo(teamId) {
    return process.env.NODE_ENV === 'production'
        ? `/kickbase-plus/assets/teams/${teamId}.png`
        : `/assets/teams/${teamId}.png`;
}