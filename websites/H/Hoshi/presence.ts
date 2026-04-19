const presence = new Presence({
  clientId: '1427242594340962425',
})
const browsingTimestamp = Math.floor(Date.now() / 1000)

enum ActivityAssets {
  Logo = 'https://hoshl.vercel.app/avatar.png',
}

presence.on('UpdateData', async () => {
  const { pathname } = document.location

  const presenceData: PresenceData = {
    largeImageKey: ActivityAssets.Logo,
    details: 'Hoshiを探索中...',
    startTimestamp: browsingTimestamp,
  }

  if (pathname === '/') {
    presenceData.state = 'TLを探索中'
  }
  else if (pathname.startsWith('/user/')) {
    const username = pathname.split('/')[2]
    presenceData.state = username ? `${username}のプロフィールを閲覧中` : 'プロフィールを閲覧中'
  }
  else if (pathname.includes('/post')) {
    presenceData.state = '投稿を作成中'
  }

  // Activityを設定する処理を追加
  if (presenceData.state) {
    presence.setActivity(presenceData)
  } else {
    presence.clearActivity()
  }
})
