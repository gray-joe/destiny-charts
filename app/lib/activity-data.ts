const STORAGE_BASE_URL = 'https://lsovkbfxdhcnxpaunabw.supabase.co/storage/v1/object/sign/activity_images';

export type BaseActivity = {
  id: string
  name: string
  description?: string
  imageUrl?: string
  subActivities?: BaseActivity[]
}

export type EncounterActivity = BaseActivity

export type SubActivity = BaseActivity & {
  subActivities?: EncounterActivity[]
}

export type MainActivity = BaseActivity & {
  description: string
  imageUrl: string
  subActivities?: SubActivity[]
}


export const activities: MainActivity[] = [
  {
    id: 'raids',
    name: 'Raids',
    description:
      'High-level 6-player activities with complex mechanics and powerful rewards.',
    imageUrl: `${STORAGE_BASE_URL}/raid.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvcmFpZC53ZWJwIiwiaWF0IjoxNzM5NzIwNDg1LCJleHAiOjE3NzEyNTY0ODV9.KJln5LX9VnCDXWpc-OedgCjJ3zecctsnx-4TkVrZ6R8`,
    subActivities: [
      {
        id: 'root-of-nightmares',
        name: 'Root of Nightmares',
        imageUrl: `${STORAGE_BASE_URL}/root_of_nightmares.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvcm9vdF9vZl9uaWdodG1hcmVzLmpwZyIsImlhdCI6MTczOTcyMDQ2NCwiZXhwIjoxNzcxMjU2NDY0fQ.sQEayhhCb4ues2k9zx7NxOo4BvRKo_5B7WjLMSdja3s`,
        subActivities: [
          { id: 'ron-boss1', name: 'Cataclysm' },
          { id: 'ron-boss2', name: 'Scission' },
        ],
      },
    ],
  },
  {
    id: 'dungeon',
    name: 'Dungeons',
    description:
      '3-player activities featuring challenging encounters and unique mechanics.',
    imageUrl: '/images/activities/dungeons.jpg',
    subActivities: [
      {
        id: 'sundered doctrine',
        name: 'Sundered Doctrine',
        imageUrl: `${STORAGE_BASE_URL}/sundered_doctrine.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvc3VuZGVyZWRfZG9jdHJpbmUuanBnIiwiaWF0IjoxNzM5NzIwNDM4LCJleHAiOjE3NzEyNTY0Mzh9.QtcUKdAh6qoj_KKuW3F-05T6s9LmkJwmS_KkTY3W0tM`,
        subActivities: [
          { id: 'sundered-encounter1', name: 'Encounter 1' },
          { id: 'sundered-encounter2', name: 'Encounter 2' },
          { id: 'sundered-encounter3', name: 'Encounter 3' },
        ],
      },
      {
        id: 'ghosts-of-the-deep',
        name: 'Ghosts of the Deep',
        imageUrl: `${STORAGE_BASE_URL}/ghosts_of_the_deep.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvZ2hvc3RzX29mX3RoZV9kZWVwLndlYnAiLCJpYXQiOjE3Mzk3MjA0MTIsImV4cCI6MTc3MTI1NjQxMn0.3bSoQPpCsZydKLgFq3sKoRgspWCYkmCdoUuVjC2oP40`,
        subActivities: [
          { id: 'ghosts-encounter1', name: 'Encounter 1' },
          { id: 'ghosts-encounter2', name: 'Encounter 2' },
          { id: 'ghosts-encounter3', name: 'Encounter 3' },
        ],
      },
    ],
  },
  {
    id: 'nightfalls',
    name: 'Nightfalls',
    description:
      'Challenging versions of strikes with modifiers and high-tier rewards.',
    imageUrl: '/images/activities/nightfalls.jpg',
    subActivities: [
      { id: 'grandmaster', name: 'Grandmaster' },
      { id: 'master', name: 'Master' },
      { id: 'legend', name: 'Legend' },
    ],
  },
  {
    id: 'pvp',
    name: 'Crucible',
    description:
      'Competitive player-versus-player combat across various game modes.',
    imageUrl: '/images/activities/pvp.jpg',
    subActivities: [
      { id: 'trials', name: 'Trials of Osiris' },
      { id: 'competitive', name: 'Competitive' },
      { id: 'quickplay', name: 'Quickplay' },
    ],
  },
  {
    id: 'gambit',
    name: 'Gambit',
    description:
      'Hybrid PvE and PvP activity featuring banking motes and invading.',
    imageUrl: '/images/activities/gambit.jpg',
  },
  {
    id: 'seasonal',
    name: 'Seasonal Activities',
    description: 'Current season activities with unique mechanics and rewards.',
    imageUrl: '/images/activities/seasonal.jpg',
    subActivities: [
      { id: 'current-seasonal', name: 'Current Season' },
      { id: 'previous-seasonal', name: 'Previous Season' },
    ],
  },
]
