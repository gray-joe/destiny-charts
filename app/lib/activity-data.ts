const STORAGE_BASE_URL =
  'https://lsovkbfxdhcnxpaunabw.supabase.co/storage/v1/object/sign/activity_images'

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
    imageUrl: `${STORAGE_BASE_URL}/raid.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvcmFpZC5qcGciLCJpYXQiOjE3NDAxNzA1ODksImV4cCI6MTc3MTcwNjU4OX0.vpb6O5V6jfqfBB_RwodwyNh3YbMLDcD0Ot5gW8cq_cM`,
    subActivities: [
      {
        id: 'salvations-edge',
        name: 'Salvations Edge',
        imageUrl: `${STORAGE_BASE_URL}/salvations_edge.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvc2FsdmF0aW9uc19lZGdlLmpwZyIsImlhdCI6MTc0MDE3MDY4NiwiZXhwIjoxNzcxNzA2Njg2fQ.AJFIdqx55jf3UHVe_-eqGHEfYXm7QBSld4czjq952uw`,
        subActivities: [],
      },
      {
        id: 'crotas-end',
        name: 'Crotas End',
        imageUrl: `${STORAGE_BASE_URL}/crotas_end.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvY3JvdGFzX2VuZC5qcGciLCJpYXQiOjE3NDAyMTg0MTIsImV4cCI6MTc3MTc1NDQxMn0.RlYEGmM3uThtPRPgKkG6HMIVXN08pVeen-HFKbMjWXE`,
        subActivities: [],
      },
      {
        id: 'root-of-nightmares',
        name: 'Root of Nightmares',
        imageUrl: `${STORAGE_BASE_URL}/root_of_nightmares.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvcm9vdF9vZl9uaWdodG1hcmVzLmpwZyIsImlhdCI6MTc0MDE3MDYxNSwiZXhwIjoxNzcxNzA2NjE1fQ.mnfQErQY5ueZXp_hgotN3V9zWKcTp8tQd9dLodb8BzU`,
        subActivities: [],
      },
      {
        id: 'kings-fall',
        name: 'Kings Fall',
        imageUrl: `${STORAGE_BASE_URL}/kings_fall.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMva2luZ3NfZmFsbC5qcGciLCJpYXQiOjE3NDAyMTg0MjYsImV4cCI6MTc3MTc1NDQyNn0.t6mlZLXmlnSEYAjG6Je45ItI4nSwPbtPzYifogwuros`,
        subActivities: [],
      },
      {
        id: 'vow-of-the-disciple',
        name: 'Vow of the Disciple',
        imageUrl: `${STORAGE_BASE_URL}/vow_of_the_disciple.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvdm93X29mX3RoZV9kaXNjaXBsZS5wbmciLCJpYXQiOjE3NDQ4MzI1MDQsImV4cCI6MTc3NjM2ODUwNH0.-TmdB8Aqs6x1DVG-uQbzOPFg9q741Sk8-L929eo-Sos`,
        subActivities: [],
      },
      {
        id: 'vault-of-glass',
        name: 'Vault of Glass',
        imageUrl: `${STORAGE_BASE_URL}/vault_of_glass.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvdmF1bHRfb2ZfZ2xhc3MucG5nIiwiaWF0IjoxNzQ0ODMyNjg5LCJleHAiOjE3NzYzNjg2ODl9.Lao8KM2HqMxE-iU6Lf8ktamxxDaHqLXlpoX6mDHCGZU`,
        subActivities: [],
      },
      {
        id: 'deep-stone-crypt',
        name: 'Deep Stone Crypt',
        imageUrl: `${STORAGE_BASE_URL}/deep-stone-crypt.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvZGVlcC1zdG9uZS1jcnlwdC5qcGciLCJpYXQiOjE3NDQ4MzI4NDQsImV4cCI6MTc3NjM2ODg0NH0.dGK6qKlGBjjtoelwHNpFRYJljnFAZdyzT1JLNeRTVfY`,
        subActivities: [],
      },
      {
        id: 'garden-of-salvation',
        name: 'Garden of Salvation',
        imageUrl: `${STORAGE_BASE_URL}/garden-of-salvation.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvZ2FyZGVuLW9mLXNhbHZhdGlvbi5qcGciLCJpYXQiOjE3NDQ4MzI5NDAsImV4cCI6MTc3NjM2ODk0MH0.Atl4uLQminjnsdM-gNA0_GmewEdWszSSQJyycp9VInE`,
        subActivities: [],
      },
      {
        id: 'last-wish',
        name: 'Last Wish',
        imageUrl: `${STORAGE_BASE_URL}/last-wish-raid.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvbGFzdC13aXNoLXJhaWQucG5nIiwiaWF0IjoxNzQ0ODMzMTAwLCJleHAiOjE3NzYzNjkxMDB9.0UFLLrcdo2lkivWBqvkvBTAMx97otWMhHTJ_YrqttxQ`,
        subActivities: [],
      },
    ],
  },
  {
    id: 'dungeon',
    name: 'Dungeons',
    description:
      '3-player activities featuring challenging encounters and unique mechanics.',
    imageUrl: `${STORAGE_BASE_URL}/dungeon.jpeg.avif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvZHVuZ2Vvbi5qcGVnLmF2aWYiLCJpYXQiOjE3NDAyMTc4MTksImV4cCI6MTc3MTc1MzgxOX0.O_JVy626xD04iwyzvsLEcDL2U7wMrVwcM3kD60te-qQ`,
    subActivities: [
      {
        id: 'sundered-doctrine',
        name: 'Sundered Doctrine',
        imageUrl: `${STORAGE_BASE_URL}/sundered_soctrine.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvc3VuZGVyZWRfc29jdHJpbmUuanBnIiwiaWF0IjoxNzQwMTcwNzQyLCJleHAiOjE3NzE3MDY3NDJ9.1N9iLWVPEw8QBoNgy8WqQwYLvsc_mt4xfx4170gV3ys`,
        subActivities: [
          { id: 'solve-the-riddle', name: 'Solve the Riddle' },
          { id: 'zoetic-lockset', name: 'Zoetic Lockset' },
          { id: 'kerrev-the-erased', name: 'Kerrev the Erased' },
        ],
      },
      {
        id: 'warlords-ruin',
        name: 'Warlords Ruin',
        imageUrl: `${STORAGE_BASE_URL}/warlords_ruin.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvd2FybG9yZHNfcnVpbi5qcGciLCJpYXQiOjE3NDAxNzA3MDYsImV4cCI6MTc3MTcwNjcwNn0.yicxTq6ydAXOAEZ3yVpU55hnzg1B2oaWuUGXOWnFkbw`,
        subActivities: [],
      },
      {
        id: 'ghosts-of-the-deep',
        name: 'Ghosts of the Deep',
        imageUrl: `${STORAGE_BASE_URL}/ghosts_of_the_deep.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvZ2hvc3RzX29mX3RoZV9kZWVwLndlYnAiLCJpYXQiOjE3Mzk3MjA0MTIsImV4cCI6MTc3MTI1NjQxMn0.3bSoQPpCsZydKLgFq3sKoRgspWCYkmCdoUuVjC2oP40`,
        subActivities: [],
      },
      {
        id: 'spire-of-the-watcher',
        name: 'Spire of the Watcher',
        imageUrl: `${STORAGE_BASE_URL}/spire_of_the_watcher.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvc3BpcmVfb2ZfdGhlX3dhdGNoZXIuanBnIiwiaWF0IjoxNzQwMjE4NTI2LCJleHAiOjE3NzE3NTQ1MjZ9.77exhK2_fxI6ImBPhWDsGQTIR5hWyIXkGTyQBA8Q87M`,
        subActivities: [],
      },
      {
        id: 'duality',
        name: 'Duality',
        imageUrl: `${STORAGE_BASE_URL}/duality.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvZHVhbGl0eS5qcGciLCJpYXQiOjE3NDAyMTg1NDMsImV4cCI6MTc3MTc1NDU0M30.mbdQh-AaZs-jtFfKNQuSSLXWqQU7NO5V6I34ziTQEn4`,
        subActivities: [],
      },
      {
        id: 'prophecy',
        name: 'Prophecy',
        imageUrl: `${STORAGE_BASE_URL}/prophecy.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvcHJvcGhlY3kuanBnIiwiaWF0IjoxNzQ0ODgzNjA4LCJleHAiOjE3NzY0MTk2MDh9.IeNla7gpgmH8MWqMWpfWbvTVaPT90kvT1MzToD8GLQg`,
        subActivities: [],
      },
      {
        id: 'grasp-of-averice',
        name: 'Grasp of Averice',
        imageUrl: `${STORAGE_BASE_URL}/grasp_of_averice.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvZ3Jhc3Bfb2ZfYXZlcmljZS5qcGciLCJpYXQiOjE3NDQ4ODM4MjcsImV4cCI6MTc3NjQxOTgyN30.xg6aeXCesn5sIEvGMdc6XrlvQNzstzIc86_5VktwCl8`,
        subActivities: [],
      },
      {
        id: 'pit-of-heresy',
        name: 'Pit of Heresy',
        imageUrl: `${STORAGE_BASE_URL}/pit_of_heresy.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvcGl0X29mX2hlcmVzeS53ZWJwIiwiaWF0IjoxNzQ0ODk2OTE1LCJleHAiOjE3NzY0MzI5MTV9.eSkJ34nSgtiN95mELQxcW1le_c7UJOJ5uCm6RdHv8l4`,
        subActivities: [],
      },
      {
        id: 'shattered-throne',
        name: 'Shattered Throne',
        imageUrl: `${STORAGE_BASE_URL}/shattered-throne.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvc2hhdHRlcmVkLXRocm9uZS5qcGciLCJpYXQiOjE3NDQ4OTY5NTQsImV4cCI6MTc3NjQzMjk1NH0.vnhOCf8BI1A7j04UjDYasV-ouvVhEUAOqrq1SyNKttY`,
        subActivities: [],
      },
    ],
  },
  {
    id: 'nightfalls',
    name: 'Nightfalls',
    description:
      'Challenging versions of strikes with modifiers and high-tier rewards.',
    imageUrl: `${STORAGE_BASE_URL}/gm_nightfall_2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvZ21fbmlnaHRmYWxsXzIucG5nIiwiaWF0IjoxNzQwMjE4MjM2LCJleHAiOjE3NzE3NTQyMzZ9.snEVQB-7BwOeP9OY63cEllWSm9LSUNigsPTQ-kZyxmY`,
    subActivities: [
      {
        id: 'hypernet-protocol',
        name: 'Hypernet Protocol',
        imageUrl: `${STORAGE_BASE_URL}/`,
        subActivities: [],
      },
    ],
  },
  {
    id: 'pvp',
    name: 'Crucible',
    description:
      'Competitive player-versus-player combat across various game modes.',
    imageUrl: `${STORAGE_BASE_URL}/pvp.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvcHZwLmpwZyIsImlhdCI6MTc0MDIxNzI2OSwiZXhwIjoxNzcxNzUzMjY5fQ.2iCq9osbqqLLduoMFZDxgRf45EDfe_crcwSb6Z0ECAw`,
    subActivities: [{ id: 'competetive', name: 'Competetive' }, { id: 'trials', name: 'Trials' }, { id: 'iron-banner', name: 'Iron Banner' }],
  },
  {
    id: 'gambit',
    name: 'Gambit',
    description:
      'Hybrid PvE and PvP activity featuring banking motes and invading.',
    imageUrl: `${STORAGE_BASE_URL}/gambit.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvZ2FtYml0LmpwZyIsImlhdCI6MTc0MDE3MTk2OCwiZXhwIjoxNzcxNzA3OTY4fQ.6QggdAECMMoZZs70lJIZEUtwmBJ9TAXO0oljtAO8tHU`,
  },
  {
    id: 'seasonal',
    name: 'Seasonal Activities',
    description: 'Current season activities with unique mechanics and rewards.',
    imageUrl: `${STORAGE_BASE_URL}/heresy.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhY3Rpdml0eV9pbWFnZXMvaGVyZXN5LmpwZyIsImlhdCI6MTc0MDE3MjIzNywiZXhwIjoxNzcxNzA4MjM3fQ.AXrfqdKVMVBHAnEIq0kSf3CpSRJyPCJ9SARd-bN2_iA`,
    subActivities: [{ id: 'nether', name: 'Nether' }],
  },
]
