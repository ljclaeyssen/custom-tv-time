import { CatalogEpisode, CatalogShowDetail, FollowedShow } from '../domain/models/show.model';
import { CatalogSearchResult } from '../domain/models/catalog.model';
import { TrackedMovie } from '../domain/models/movie.model';
import { ProfileStatsFull } from '../domain/models/stats.model';
import { Profile } from '../domain/models/user.model';

// Données statiques de la démo (demo.vu.ljclaeyssen.fr) — extraites du vrai
// historique TV Time et résolues via TMDB (posters, saisons, épisodes réels).
// Régénérables via le script décrit dans demo/README.md ; à faire évoluer en
// même temps que toute évolution du frontend.

export interface DemoShowSeed {
  show: FollowedShow;
  detail: CatalogShowDetail;
  /** Nombre d'épisodes vus, cohérent avec le statut. */
  watchedCount: number;
}

export interface DemoWatchNextSeed {
  /** tmdbShowId de la série concernée (présente dans DEMO_SHOWS). */
  seed: number;
  nextEpisode: CatalogEpisode;
  /** Ancienneté du dernier visionnage, convertie en date au runtime. */
  lastWatchedDaysAgo: number;
}

export interface DemoRecentSeed {
  tmdbShowId: number;
  showName: string;
  posterPath: string | null;
  season: number;
  episode: number;
  daysAgo: number;
}

export const DEMO_PROFILE: Profile = {
  "user": {
    "id": "demo-user",
    "discordId": "demo",
    "username": "Visiteur",
    "avatarUrl": null,
    "createdAt": "2026-07-05T12:00:00.000Z"
  },
  "stats": {
    "showsFollowed": 18,
    "episodesWatched": 5414,
    "moviesWatched": 8,
    "moviesInWatchlist": 4
  }
};

export const DEMO_SHOWS: DemoShowSeed[] = [
  {
    "show": {
      "id": "demo-follow-1",
      "userId": "demo-user",
      "tmdbShowId": 37854,
      "tvdbId": null,
      "name": "One Piece",
      "posterPath": "/dB4EDhre2dsC2kxYDavyKWqLQwi.jpg",
      "status": "watching",
      "followedAt": "2023-10-10T19:15:00.832662Z"
    },
    "detail": {
      "tmdbId": 37854,
      "name": "One Piece",
      "overview": "Years ago, the fearsome Pirate King, Gol D. Roger was executed leaving a huge pile of treasure and the famous \"One Piece\" behind. Whoever claims the \"One Piece\" will be named the new King of the Pirates.\n\nMonkey D. Luffy, a boy who consumed a \"Devil Fruit,\" decides to follow in the footsteps of his idol, the pirate Shanks, and find the One Piece. It helps, of course, that his body has the properties of rubber and that he's surrounded by a bevy of skilled fighters and thieves to help him along the way.\n\nLuffy will do anything to get the One Piece and become King of the Pirates!",
      "posterPath": "/dB4EDhre2dsC2kxYDavyKWqLQwi.jpg",
      "backdropPath": "/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg",
      "firstAirDate": "1999-10-20",
      "status": "Returning Series",
      "inProduction": true,
      "numberOfEpisodes": 1181,
      "numberOfSeasons": 23,
      "episodeRuntime": 24,
      "genres": [
        "Action & Adventure",
        "Comedy",
        "Animation"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "East Blue",
          "episodeCount": 61,
          "posterPath": "/9hW62RDq5Dno8vLABXscddjEq9M.jpg",
          "airDate": "1999-10-20"
        },
        {
          "seasonNumber": 2,
          "name": "Whiskey Peak & Little Garden",
          "episodeCount": 16,
          "posterPath": "/gMPQIxlTDt463pnuvr2axpkkB13.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 3,
          "name": "Drum Island",
          "episodeCount": 14,
          "posterPath": "/fyOt2eCAVAB5tUpf4oOrLqX1cYD.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 4,
          "name": "Alabasta",
          "episodeCount": 39,
          "posterPath": "/lmO3xnBHVlT8On8E6AukMDyhKzv.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 5,
          "name": "Dreams!, The Zenny Pirate Crew Sortie!, Beyond the Rainbow",
          "episodeCount": 13,
          "posterPath": "/dJHWwdcNzsbBUAnXdNsrIAgkmiK.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 6,
          "name": "Skypiea",
          "episodeCount": 52,
          "posterPath": "/hYasiagbhomaEj0Vv1LMqewOuBE.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 7,
          "name": "G-8 & Long Ring Long Land",
          "episodeCount": 33,
          "posterPath": "/A2msjyMOBEdbSHjiPHWLZhKI5HS.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 8,
          "name": "Water Seven",
          "episodeCount": 35,
          "posterPath": "/ww1JO056uv4KhDSycDTLkNRveIg.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 9,
          "name": "Enies Lobby",
          "episodeCount": 73,
          "posterPath": "/7y6yoAIepNVrNTLMxgHEEgjEEge.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 10,
          "name": "Thriller Bark",
          "episodeCount": 45,
          "posterPath": "/aznhNoyRyJOh6cxFYkcU2zGxOEo.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 11,
          "name": "Sabaody Archipelago",
          "episodeCount": 26,
          "posterPath": "/kMvtZUg4jCZ4JzEqvOCjkiklQfF.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 12,
          "name": "Amazon Lily",
          "episodeCount": 14,
          "posterPath": "/bVjlWX17j9t6XB3AZ3KOv7ya7g7.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 13,
          "name": "Impel Down & Marineford",
          "episodeCount": 101,
          "posterPath": "/zcVNRh5sqdgSgoXm0Z2GlTxF6DN.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 14,
          "name": "Fishman Island",
          "episodeCount": 58,
          "posterPath": "/wpVC1e0RVK2qRtZMFDYu1c6mHcy.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 15,
          "name": "Punk Hazard",
          "episodeCount": 62,
          "posterPath": "/slTtfpqvqelTNoRTxTuiSvqWoTU.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 16,
          "name": "Dressrosa",
          "episodeCount": 50,
          "posterPath": "/sDzpqSCuCyvKIcJADOhPD261maG.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 17,
          "name": "Dressrosa (2)",
          "episodeCount": 56,
          "posterPath": "/nXyJ2Yor5VUX8Zpwf0eQbuDOsF0.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 18,
          "name": "Zou",
          "episodeCount": 55,
          "posterPath": "/wg7ngI5lw0u54xRY5FwmlvzS9cu.jpg",
          "airDate": "2016-07-13"
        },
        {
          "seasonNumber": 19,
          "name": "Whole Cake Island",
          "episodeCount": 74,
          "posterPath": "/59G8pVHbFqSuAQAitdK9CKGAZXX.jpg",
          "airDate": "2017-09-05"
        },
        {
          "seasonNumber": 20,
          "name": "Levely Arc",
          "episodeCount": 14,
          "posterPath": "/huF0TU9U8UIt2BaLGn6Ujbjikbg.jpg",
          "airDate": "2019-04-01"
        },
        {
          "seasonNumber": 21,
          "name": "Wano Country Arc",
          "episodeCount": 197,
          "posterPath": "/awSahTRht2V11NKVp8KaMyd3z2v.jpg",
          "airDate": "2019-07-08"
        },
        {
          "seasonNumber": 22,
          "name": "Egghead",
          "episodeCount": 67,
          "posterPath": "/fqOUJhVYQchjaxOPHiBJ6I7Gr1l.jpg",
          "airDate": null
        },
        {
          "seasonNumber": 23,
          "name": "Elbaph",
          "episodeCount": 26,
          "posterPath": "/9L4GHTq4YZq1wVq51yFxrdindrB.jpg",
          "airDate": null
        }
      ]
    },
    "watchedCount": 154
  },
  {
    "show": {
      "id": "demo-follow-2",
      "userId": "demo-user",
      "tmdbShowId": 95479,
      "tvdbId": null,
      "name": "JUJUTSU KAISEN",
      "posterPath": "/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
      "status": "watching",
      "followedAt": "2021-02-20T12:34:08Z"
    },
    "detail": {
      "tmdbId": 95479,
      "name": "JUJUTSU KAISEN",
      "overview": "Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a classmate who has been attacked by curses, he eats the finger of Ryomen Sukuna, taking the curse into his own soul. From then on, he shares one body with Ryomen Sukuna. Guided by the most powerful of sorcerers, Satoru Gojo, Itadori is admitted to Tokyo Jujutsu High School, an organization that fights the curses... and thus begins the heroic tale of a boy who became a curse to exorcise a curse, a life from which he could never turn back.",
      "posterPath": "/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
      "backdropPath": "/lthkKBLe1rX6iThgVFg22O02sJw.jpg",
      "firstAirDate": "2020-10-03",
      "status": "Returning Series",
      "inProduction": true,
      "numberOfEpisodes": 59,
      "numberOfSeasons": 1,
      "episodeRuntime": 24,
      "genres": [
        "Animation",
        "Action & Adventure",
        "Sci-Fi & Fantasy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Season 1",
          "episodeCount": 59,
          "posterPath": "/fHQ2XHRdRix0rkDCShmGQ8c6d03.jpg",
          "airDate": "2020-10-03"
        }
      ]
    },
    "watchedCount": 47
  },
  {
    "show": {
      "id": "demo-follow-3",
      "userId": "demo-user",
      "tmdbShowId": 57243,
      "tvdbId": null,
      "name": "Doctor Who",
      "posterPath": "/m6G92osOtSeXwjSfL21jZCUOvxe.jpg",
      "status": "watching",
      "followedAt": "2015-10-11T11:50:01Z"
    },
    "detail": {
      "tmdbId": 57243,
      "name": "Doctor Who",
      "overview": "The Doctor is a Time Lord: a 900 year old alien with 2 hearts, part of a gifted civilization who mastered time travel. The Doctor saves planets for a living—more of a hobby actually, and the Doctor's very, very good at it.",
      "posterPath": "/m6G92osOtSeXwjSfL21jZCUOvxe.jpg",
      "backdropPath": "/vcFW09U4834DyFOeRZpsx9x1D3S.jpg",
      "firstAirDate": "2005-03-26",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 153,
      "numberOfSeasons": 13,
      "episodeRuntime": null,
      "genres": [
        "Action & Adventure",
        "Drama",
        "Sci-Fi & Fantasy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Series 1",
          "episodeCount": 13,
          "posterPath": "/9Jt2FFCAME7eHDC28r4qCHErhhF.jpg",
          "airDate": "2005-03-26"
        },
        {
          "seasonNumber": 2,
          "name": "Series 2",
          "episodeCount": 13,
          "posterPath": "/oXVmsIkZCgJDNcZJJxzvV7zwyb1.jpg",
          "airDate": "2006-04-15"
        },
        {
          "seasonNumber": 3,
          "name": "Series 3",
          "episodeCount": 13,
          "posterPath": "/67xbjSv353G2rqQIs6dnDKc6P11.jpg",
          "airDate": "2007-04-01"
        },
        {
          "seasonNumber": 4,
          "name": "Series 4",
          "episodeCount": 13,
          "posterPath": "/h6hogh9U371q87XLhvrJbczg8lm.jpg",
          "airDate": "2008-04-05"
        },
        {
          "seasonNumber": 5,
          "name": "Series 5",
          "episodeCount": 13,
          "posterPath": "/hUsQerEeMqsu9cVYzMEB2OGJjrw.jpg",
          "airDate": "2010-04-03"
        },
        {
          "seasonNumber": 6,
          "name": "Series 6",
          "episodeCount": 13,
          "posterPath": "/xmfMcVkVer5r33QhA4e2DpIR78B.jpg",
          "airDate": "2011-04-23"
        },
        {
          "seasonNumber": 7,
          "name": "Series 7",
          "episodeCount": 13,
          "posterPath": "/6biGcR0OyFnKRxxUW7bGtK49wTd.jpg",
          "airDate": "2012-09-01"
        },
        {
          "seasonNumber": 8,
          "name": "Series 8",
          "episodeCount": 12,
          "posterPath": "/wLxULmhnIM1wbzjzvFnEq8YXtFB.jpg",
          "airDate": "2014-08-23"
        },
        {
          "seasonNumber": 9,
          "name": "Series 9",
          "episodeCount": 12,
          "posterPath": "/AeFY6HsLGcanP2fhD6Feii9BhHW.jpg",
          "airDate": "2015-09-19"
        },
        {
          "seasonNumber": 10,
          "name": "Series 10",
          "episodeCount": 12,
          "posterPath": "/9ExkVNeQw695kQ8xsnm2TJhTEFP.jpg",
          "airDate": "2017-04-15"
        },
        {
          "seasonNumber": 11,
          "name": "Series 11",
          "episodeCount": 10,
          "posterPath": "/tFu6Or2wZP8xW5CBUy3MROtcF29.jpg",
          "airDate": "2018-10-07"
        },
        {
          "seasonNumber": 12,
          "name": "Series 12",
          "episodeCount": 10,
          "posterPath": "/lbogQ62ZgARQd3uuLl7e3fJeQ5r.jpg",
          "airDate": "2020-01-01"
        },
        {
          "seasonNumber": 13,
          "name": "Flux",
          "episodeCount": 6,
          "posterPath": "/hnAwYE6NvC4UVdMRPd7FOX52PQy.jpg",
          "airDate": "2021-10-31"
        }
      ]
    },
    "watchedCount": 58
  },
  {
    "show": {
      "id": "demo-follow-4",
      "userId": "demo-user",
      "tmdbShowId": 94664,
      "tvdbId": null,
      "name": "Mushoku Tensei: Jobless Reincarnation",
      "posterPath": "/gLKOYIMyKlUHW0SVdskhgf9C0yy.jpg",
      "status": "watching",
      "followedAt": "2020-09-23T14:33:41Z"
    },
    "detail": {
      "tmdbId": 94664,
      "name": "Mushoku Tensei: Jobless Reincarnation",
      "overview": "When a 34-year-old underachiever gets run over by a truck, his story doesn't end there. Reincarnated in a new world as an infant, Rudy will seize every opportunity to live the life he's always wanted. Armed with new friends, some freshly acquired magical abilities, and the courage to do the things he's always dreamed of, he's embarking on an epic adventure—with all of his past experience intact!",
      "posterPath": "/gLKOYIMyKlUHW0SVdskhgf9C0yy.jpg",
      "backdropPath": "/j9fRIimor0AMFJR9kjZubXcABzZ.jpg",
      "firstAirDate": "2021-01-11",
      "status": "Returning Series",
      "inProduction": true,
      "numberOfEpisodes": 61,
      "numberOfSeasons": 3,
      "episodeRuntime": 24,
      "genres": [
        "Action & Adventure",
        "Animation",
        "Sci-Fi & Fantasy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Season 1",
          "episodeCount": 23,
          "posterPath": "/4vEel9ztoC3PtQFOkthVPtdlWQr.jpg",
          "airDate": "2021-01-11"
        },
        {
          "seasonNumber": 2,
          "name": "Season 2",
          "episodeCount": 24,
          "posterPath": "/kVHnRfj5c7rzetzMPlRQXEZRzkH.jpg",
          "airDate": "2023-07-10"
        },
        {
          "seasonNumber": 3,
          "name": "Season 3",
          "episodeCount": 14,
          "posterPath": "/kZNFYvX1brcjubHXNa1naMwRoov.jpg",
          "airDate": "2026-07-04"
        }
      ]
    },
    "watchedCount": 47
  },
  {
    "show": {
      "id": "demo-follow-5",
      "userId": "demo-user",
      "tmdbShowId": 86031,
      "tvdbId": null,
      "name": "Dr. STONE",
      "posterPath": "/xbZQ3fDl0y5mt0ARwfeyrgQ4JTw.jpg",
      "status": "watching",
      "followedAt": "2019-09-16T20:41:35Z"
    },
    "detail": {
      "tmdbId": 86031,
      "name": "Dr. STONE",
      "overview": "One fateful day, all of humanity was petrified by a blinding flash of light. After several millennia, high schooler Taiju awakens and finds himself lost in a world of statues. However, he’s not alone! His science-loving friend Senku’s been up and running for a few months and he's got a grand plan in mind—to kickstart civilization with the power of science!",
      "posterPath": "/xbZQ3fDl0y5mt0ARwfeyrgQ4JTw.jpg",
      "backdropPath": "/lN13BPAEnc5iXmoxxBQHOZ1ScfZ.jpg",
      "firstAirDate": "2019-07-05",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 94,
      "numberOfSeasons": 4,
      "episodeRuntime": 24,
      "genres": [
        "Animation",
        "Action & Adventure",
        "Comedy",
        "Sci-Fi & Fantasy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Season 1",
          "episodeCount": 24,
          "posterPath": "/58EudfXv38HfupYBpfn8txOlZpO.jpg",
          "airDate": "2019-07-05"
        },
        {
          "seasonNumber": 2,
          "name": "Stone Wars",
          "episodeCount": 11,
          "posterPath": "/a1gQ45ZJELpIpFwOmRC1763rrGb.jpg",
          "airDate": "2021-01-14"
        },
        {
          "seasonNumber": 3,
          "name": "New World",
          "episodeCount": 22,
          "posterPath": "/viAM23pmS4wi4u8oyGLZoR2jJPP.jpg",
          "airDate": "2023-04-06"
        },
        {
          "seasonNumber": 4,
          "name": "Science Future",
          "episodeCount": 37,
          "posterPath": "/bCAQTc3ci6PqZv8I6ynKUUnFRjt.jpg",
          "airDate": "2025-01-09"
        }
      ]
    },
    "watchedCount": 91
  },
  {
    "show": {
      "id": "demo-follow-6",
      "userId": "demo-user",
      "tmdbShowId": 85937,
      "tvdbId": null,
      "name": "Demon Slayer: Kimetsu no Yaiba",
      "posterPath": "/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
      "status": "up_to_date",
      "followedAt": "2019-09-18T12:03:05Z"
    },
    "detail": {
      "tmdbId": 85937,
      "name": "Demon Slayer: Kimetsu no Yaiba",
      "overview": "After a demon attack leaves his family slain and his sister cursed, Tanjiro embarks upon a perilous journey to find a cure and avenge those he's lost.",
      "posterPath": "/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
      "backdropPath": "/3GQKYh6Trm8pxd2AypovoYQf4Ay.jpg",
      "firstAirDate": "2019-04-06",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 63,
      "numberOfSeasons": 5,
      "episodeRuntime": null,
      "genres": [
        "Animation",
        "Action & Adventure",
        "Sci-Fi & Fantasy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Unwavering Resolve Arc",
          "episodeCount": 26,
          "posterPath": "/bV0ZCL0IqrTQKClu6EtXlZaJevD.jpg",
          "airDate": "2019-04-06"
        },
        {
          "seasonNumber": 2,
          "name": "Mugen Train Arc",
          "episodeCount": 7,
          "posterPath": "/pLGjaDyg2LeA2d9KZxBZCiiqC2B.jpg",
          "airDate": "2021-10-10"
        },
        {
          "seasonNumber": 3,
          "name": "Entertainment District Arc",
          "episodeCount": 11,
          "posterPath": "/gbmhcOtre5SeBgwR9gvTpUra5kZ.jpg",
          "airDate": "2021-12-05"
        },
        {
          "seasonNumber": 4,
          "name": "Swordsmith Village Arc",
          "episodeCount": 11,
          "posterPath": "/6gD7G8HQay1X8mHiFVttWJ3czYb.jpg",
          "airDate": "2023-04-09"
        },
        {
          "seasonNumber": 5,
          "name": "Hashira Training Arc",
          "episodeCount": 8,
          "posterPath": "/axI3BUZgTYz36IYtUtRhivtspUo.jpg",
          "airDate": "2024-05-12"
        }
      ]
    },
    "watchedCount": 63
  },
  {
    "show": {
      "id": "demo-follow-7",
      "userId": "demo-user",
      "tmdbShowId": 1429,
      "tvdbId": null,
      "name": "Attack on Titan",
      "posterPath": "/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
      "status": "up_to_date",
      "followedAt": "2022-01-11T11:28:36.258097Z"
    },
    "detail": {
      "tmdbId": 1429,
      "name": "Attack on Titan",
      "overview": "100 years ago, the last remnants of humanity were forced to retreat behind the towering walls of a fortified city to escape the massive, man-eating Titans that roamed the land outside their fortress. Only the members of the Scouting Legion dared to stray beyond the safety of the walls – but even those brave warriors seldom returned alive. Those within the city clung to the illusion of a peaceful existence until the day that dream was shattered, and their slim chance at survival was reduced to one horrifying choice: kill – or be devoured!",
      "posterPath": "/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
      "backdropPath": "/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg",
      "firstAirDate": "2013-04-07",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 87,
      "numberOfSeasons": 4,
      "episodeRuntime": null,
      "genres": [
        "Animation",
        "Sci-Fi & Fantasy",
        "Action & Adventure"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Season 1",
          "episodeCount": 25,
          "posterPath": "/3Npd9yTdy76kHzoFpL0SOIxE6Uv.jpg",
          "airDate": "2013-04-07"
        },
        {
          "seasonNumber": 2,
          "name": "Season 2",
          "episodeCount": 12,
          "posterPath": "/2fhK0wbFixskgRyuq6YvaMn75et.jpg",
          "airDate": "2017-04-01"
        },
        {
          "seasonNumber": 3,
          "name": "Season 3",
          "episodeCount": 22,
          "posterPath": "/ynow2o9v0G341PLv1chCRDufCgc.jpg",
          "airDate": "2018-07-23"
        },
        {
          "seasonNumber": 4,
          "name": "The Final Season",
          "episodeCount": 28,
          "posterPath": "/sfbSjGlLHsvFQrMUSNR9RrwZgV1.jpg",
          "airDate": "2020-12-07"
        }
      ]
    },
    "watchedCount": 87
  },
  {
    "show": {
      "id": "demo-follow-8",
      "userId": "demo-user",
      "tmdbShowId": 65930,
      "tvdbId": null,
      "name": "My Hero Academia",
      "posterPath": "/phuYuzqWW9ru8EA3HVjE9W2Rr3M.jpg",
      "status": "up_to_date",
      "followedAt": "2019-09-18T12:03:45Z"
    },
    "detail": {
      "tmdbId": 65930,
      "name": "My Hero Academia",
      "overview": "What would the world be like if 80 percent of the population manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?\n\nMiddle school student Izuku Midoriya wants to be a hero more than anything, but he hasn't got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all gives him a chance to change his destiny…",
      "posterPath": "/phuYuzqWW9ru8EA3HVjE9W2Rr3M.jpg",
      "backdropPath": "/ol0H2DGp4ifBHA4JDlCpwJWxnY2.jpg",
      "firstAirDate": "2016-04-03",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 170,
      "numberOfSeasons": 8,
      "episodeRuntime": 24,
      "genres": [
        "Action & Adventure",
        "Animation",
        "Sci-Fi & Fantasy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Season 1",
          "episodeCount": 13,
          "posterPath": "/1u4HqgEKOmjXM8ENGtlrF4yXIwp.jpg",
          "airDate": "2016-04-03"
        },
        {
          "seasonNumber": 2,
          "name": "Season 2",
          "episodeCount": 25,
          "posterPath": "/bDCGl91IP8WQdQC2XabG18849aU.jpg",
          "airDate": "2017-04-01"
        },
        {
          "seasonNumber": 3,
          "name": "Season 3",
          "episodeCount": 25,
          "posterPath": "/s6R41zHka1t98S8ymjBzHgFIMzf.jpg",
          "airDate": "2018-04-07"
        },
        {
          "seasonNumber": 4,
          "name": "Season 4",
          "episodeCount": 25,
          "posterPath": "/zfIwUDWfKNsar4f8bWryVdBSg7z.jpg",
          "airDate": "2019-10-12"
        },
        {
          "seasonNumber": 5,
          "name": "Season 5",
          "episodeCount": 25,
          "posterPath": "/mXdO03Ac00wNiVfmbF3CnEa0zpb.jpg",
          "airDate": "2021-03-27"
        },
        {
          "seasonNumber": 6,
          "name": "Season 6",
          "episodeCount": 25,
          "posterPath": "/3yjbvxFZzbvGQxCE6P1UH39WANL.jpg",
          "airDate": "2022-10-01"
        },
        {
          "seasonNumber": 7,
          "name": "Season 7",
          "episodeCount": 21,
          "posterPath": "/1KmGAaxzl8y62HUJH1VgM5a5XyL.jpg",
          "airDate": "2024-05-04"
        },
        {
          "seasonNumber": 8,
          "name": "FINAL SEASON",
          "episodeCount": 11,
          "posterPath": "/q0Uc3pGhGDw5vtUOKpiyZSkg2z2.jpg",
          "airDate": "2025-10-04"
        }
      ]
    },
    "watchedCount": 170
  },
  {
    "show": {
      "id": "demo-follow-9",
      "userId": "demo-user",
      "tmdbShowId": 46298,
      "tvdbId": null,
      "name": "Hunter x Hunter",
      "posterPath": "/i2EEr2uBvRlAwJ8d8zTG2Y19mIa.jpg",
      "status": "up_to_date",
      "followedAt": "2015-10-20T13:12:09Z"
    },
    "detail": {
      "tmdbId": 46298,
      "name": "Hunter x Hunter",
      "overview": "Gon, a young boy who lives on Whale Island, dreams of becoming a Hunter like his father, who left when Gon was still young.",
      "posterPath": "/i2EEr2uBvRlAwJ8d8zTG2Y19mIa.jpg",
      "backdropPath": "/bFKKyCI89Xq98Gul8cGox8K3sZa.jpg",
      "firstAirDate": "2011-10-02",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 148,
      "numberOfSeasons": 3,
      "episodeRuntime": 24,
      "genres": [
        "Animation",
        "Action & Adventure",
        "Sci-Fi & Fantasy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Season 1",
          "episodeCount": 62,
          "posterPath": "/4jA40N280wb9NT7yjtFdcJND5aq.jpg",
          "airDate": "2011-10-02"
        },
        {
          "seasonNumber": 2,
          "name": "Season 2",
          "episodeCount": 74,
          "posterPath": "/itMuFli5HRafl3ofO5srdN0mmCQ.jpg",
          "airDate": "2012-12-15"
        },
        {
          "seasonNumber": 3,
          "name": "Season 3",
          "episodeCount": 12,
          "posterPath": "/eHv7DcRol9xrpwE14D4GuRdgcH0.jpg",
          "airDate": "2014-07-07"
        }
      ]
    },
    "watchedCount": 148
  },
  {
    "show": {
      "id": "demo-follow-10",
      "userId": "demo-user",
      "tmdbShowId": 246,
      "tvdbId": null,
      "name": "Avatar: The Last Airbender",
      "posterPath": "/yaGt4GIutpbXHsv48tWceWg6s56.jpg",
      "status": "up_to_date",
      "followedAt": "2017-08-14T08:43:52Z"
    },
    "detail": {
      "tmdbId": 246,
      "name": "Avatar: The Last Airbender",
      "overview": "In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny as the Avatar, and bring peace to the world.",
      "posterPath": "/yaGt4GIutpbXHsv48tWceWg6s56.jpg",
      "backdropPath": "/kU98MbVVgi72wzceyrEbClZmMFe.jpg",
      "firstAirDate": "2005-02-21",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 61,
      "numberOfSeasons": 3,
      "episodeRuntime": 24,
      "genres": [
        "Animation",
        "Action & Adventure",
        "Sci-Fi & Fantasy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Book One: Water",
          "episodeCount": 20,
          "posterPath": "/tUG6h0rMtQyOgvqI8r9AqxlKoUP.jpg",
          "airDate": "2005-02-21"
        },
        {
          "seasonNumber": 2,
          "name": "Book Two: Earth",
          "episodeCount": 20,
          "posterPath": "/quX70K1L7vTLQ9vRJcK0kKcNNFA.jpg",
          "airDate": "2006-03-17"
        },
        {
          "seasonNumber": 3,
          "name": "Book Three: Fire",
          "episodeCount": 21,
          "posterPath": "/roPE4jaHawj1Dm6uIXJHuLDpkNy.jpg",
          "airDate": "2007-09-21"
        }
      ]
    },
    "watchedCount": 61
  },
  {
    "show": {
      "id": "demo-follow-11",
      "userId": "demo-user",
      "tmdbShowId": 33880,
      "tvdbId": null,
      "name": "The Legend of Korra",
      "posterPath": "/dZgYvSfuh1YHDrJuILlVQ5oA2hF.jpg",
      "status": "up_to_date",
      "followedAt": "2018-09-07T07:47:45Z"
    },
    "detail": {
      "tmdbId": 33880,
      "name": "The Legend of Korra",
      "overview": "Avatar Korra, a headstrong, rebellious, feisty young woman who continually challenges and breaks with tradition, is on her quest to become a fully realized Avatar. In this story, the Avatar struggles to find balance within herself.",
      "posterPath": "/dZgYvSfuh1YHDrJuILlVQ5oA2hF.jpg",
      "backdropPath": "/hmrNfrUl3FFaymDj6Iw5oKQjIs2.jpg",
      "firstAirDate": "2012-04-14",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 52,
      "numberOfSeasons": 4,
      "episodeRuntime": 23,
      "genres": [
        "Animation",
        "Action & Adventure",
        "Sci-Fi & Fantasy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Book One: Air",
          "episodeCount": 12,
          "posterPath": "/MZviFVuu9UxGsSjc2UFMixMRMm.jpg",
          "airDate": "2012-04-14"
        },
        {
          "seasonNumber": 2,
          "name": "Book Two: Spirits",
          "episodeCount": 14,
          "posterPath": "/4Ev7tsxWx0QCBl5ViaOLPb0JEMs.jpg",
          "airDate": "2013-09-13"
        },
        {
          "seasonNumber": 3,
          "name": "Book Three: Change",
          "episodeCount": 13,
          "posterPath": "/zXUWNGU6f5LGT4fl2zqDqYyiWDG.jpg",
          "airDate": "2014-06-27"
        },
        {
          "seasonNumber": 4,
          "name": "Book Four: Balance",
          "episodeCount": 13,
          "posterPath": "/1KpFAA5KQUjnTtn3aTQMaeTxG0R.jpg",
          "airDate": "2014-10-03"
        }
      ]
    },
    "watchedCount": 52
  },
  {
    "show": {
      "id": "demo-follow-12",
      "userId": "demo-user",
      "tmdbShowId": 1421,
      "tvdbId": null,
      "name": "Modern Family",
      "posterPath": "/k5Qg5rgPoKdh3yTJJrLtyoyYGwC.jpg",
      "status": "up_to_date",
      "followedAt": "2016-04-11T19:58:12Z"
    },
    "detail": {
      "tmdbId": 1421,
      "name": "Modern Family",
      "overview": "The Pritchett-Dunphy-Tucker clan is a wonderfully large and blended family. They give us an honest and often hilarious look into the sometimes warm, sometimes twisted, embrace of the modern family.",
      "posterPath": "/k5Qg5rgPoKdh3yTJJrLtyoyYGwC.jpg",
      "backdropPath": "/nO7EzksrBzlNpAg5rgv8HzaBIkx.jpg",
      "firstAirDate": "2009-09-23",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 250,
      "numberOfSeasons": 11,
      "episodeRuntime": null,
      "genres": [
        "Comedy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Season 1",
          "episodeCount": 24,
          "posterPath": "/i1KhQoI391KaEA5fKArrzoTvNDk.jpg",
          "airDate": "2009-09-23"
        },
        {
          "seasonNumber": 2,
          "name": "Season 2",
          "episodeCount": 24,
          "posterPath": "/yvBc8av9K1g5QRtBDnP5xY69jb4.jpg",
          "airDate": "2010-09-22"
        },
        {
          "seasonNumber": 3,
          "name": "Season 3",
          "episodeCount": 24,
          "posterPath": "/a4EJOG8VOV02veUIYtu4lX6FVdr.jpg",
          "airDate": "2011-09-21"
        },
        {
          "seasonNumber": 4,
          "name": "Season 4",
          "episodeCount": 24,
          "posterPath": "/3fpusiurM5qBwiHVpMFBkLYxgIx.jpg",
          "airDate": "2012-09-26"
        },
        {
          "seasonNumber": 5,
          "name": "Season 5",
          "episodeCount": 24,
          "posterPath": "/sJ9PqGDvGIOwJfSle62yGGieZC1.jpg",
          "airDate": "2013-09-25"
        },
        {
          "seasonNumber": 6,
          "name": "Season 6",
          "episodeCount": 24,
          "posterPath": "/5cUUBx6iUrWFvJ8BmP2d4SATy1G.jpg",
          "airDate": "2014-09-24"
        },
        {
          "seasonNumber": 7,
          "name": "Season 7",
          "episodeCount": 22,
          "posterPath": "/825aF6sf43gIyPsX0oeNNhqMzuH.jpg",
          "airDate": "2015-09-23"
        },
        {
          "seasonNumber": 8,
          "name": "Season 8",
          "episodeCount": 22,
          "posterPath": "/coOmsK9sWpScfLDlRXQ2xUJdzZ8.jpg",
          "airDate": "2016-09-21"
        },
        {
          "seasonNumber": 9,
          "name": "Season 9",
          "episodeCount": 22,
          "posterPath": "/innrJlIzs0mktUCcQaGvMYMu4pk.jpg",
          "airDate": "2017-09-27"
        },
        {
          "seasonNumber": 10,
          "name": "Season 10",
          "episodeCount": 22,
          "posterPath": "/4aksppat5nq4IO08crJwcL2bbrv.jpg",
          "airDate": "2018-09-26"
        },
        {
          "seasonNumber": 11,
          "name": "Season 11",
          "episodeCount": 18,
          "posterPath": "/sMIhyJw2s1PRS8S7UtVnQrHAlNB.jpg",
          "airDate": "2019-09-25"
        }
      ]
    },
    "watchedCount": 250
  },
  {
    "show": {
      "id": "demo-follow-13",
      "userId": "demo-user",
      "tmdbShowId": 1418,
      "tvdbId": null,
      "name": "The Big Bang Theory",
      "posterPath": "/euKFiO5M125rpngFRBbSW83beeI.jpg",
      "status": "up_to_date",
      "followedAt": "2015-10-11T11:48:48Z"
    },
    "detail": {
      "tmdbId": 1418,
      "name": "The Big Bang Theory",
      "overview": "Physicists Leonard and Sheldon find their nerd-centric social circle with pals Howard and Raj expanding when aspiring actress Penny moves in next door.",
      "posterPath": "/euKFiO5M125rpngFRBbSW83beeI.jpg",
      "backdropPath": "/rwYvhVv0vwbulMwxOfEsuAr1JrT.jpg",
      "firstAirDate": "2007-09-24",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 279,
      "numberOfSeasons": 12,
      "episodeRuntime": 22,
      "genres": [
        "Comedy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Season 1",
          "episodeCount": 17,
          "posterPath": "/zqAL2rav7Tg8uwDtLurqZVN3mtr.jpg",
          "airDate": "2007-09-24"
        },
        {
          "seasonNumber": 2,
          "name": "Season 2",
          "episodeCount": 23,
          "posterPath": "/2NBwUBZ4clwj6qO9fBinfxiB0dR.jpg",
          "airDate": "2008-09-22"
        },
        {
          "seasonNumber": 3,
          "name": "Season 3",
          "episodeCount": 23,
          "posterPath": "/j64iUb52W2IYE9qV9pLi5tFq8IE.jpg",
          "airDate": "2009-09-21"
        },
        {
          "seasonNumber": 4,
          "name": "Season 4",
          "episodeCount": 24,
          "posterPath": "/hM2TYCmOVXop1xhLA1Mbqyg60ze.jpg",
          "airDate": "2010-09-23"
        },
        {
          "seasonNumber": 5,
          "name": "Season 5",
          "episodeCount": 24,
          "posterPath": "/l08Z8ihAsTRPEuOehbwk4axg3cu.jpg",
          "airDate": "2011-09-22"
        },
        {
          "seasonNumber": 6,
          "name": "Season 6",
          "episodeCount": 24,
          "posterPath": "/2Rsb94mlt4OHhiO2UWatDOhnBqv.jpg",
          "airDate": "2012-09-27"
        },
        {
          "seasonNumber": 7,
          "name": "Season 7",
          "episodeCount": 24,
          "posterPath": "/e0qyw3fMp7HDIA3dtCkaQD18Ra9.jpg",
          "airDate": "2013-09-26"
        },
        {
          "seasonNumber": 8,
          "name": "Season 8",
          "episodeCount": 24,
          "posterPath": "/zwb4rlgJg587XcL2cekvNDnqPpq.jpg",
          "airDate": "2014-09-22"
        },
        {
          "seasonNumber": 9,
          "name": "Season 9",
          "episodeCount": 24,
          "posterPath": "/dGEugT2ojCWBQjCqovm0GponQ0W.jpg",
          "airDate": "2015-09-21"
        },
        {
          "seasonNumber": 10,
          "name": "Season 10",
          "episodeCount": 24,
          "posterPath": "/dz2Mq1bpjBFiTOJbomCEP59kqJV.jpg",
          "airDate": "2016-09-19"
        },
        {
          "seasonNumber": 11,
          "name": "Season 11",
          "episodeCount": 24,
          "posterPath": "/A373F7AzZtIFy3l2LryC2yr2hC2.jpg",
          "airDate": "2017-09-25"
        },
        {
          "seasonNumber": 12,
          "name": "Season 12",
          "episodeCount": 24,
          "posterPath": "/txta7TTNUfGCgsJI9oB6vb6uFlA.jpg",
          "airDate": "2018-09-24"
        }
      ]
    },
    "watchedCount": 279
  },
  {
    "show": {
      "id": "demo-follow-14",
      "userId": "demo-user",
      "tmdbShowId": 37863,
      "tvdbId": null,
      "name": "Fullmetal Alchemist",
      "posterPath": "/kKOQbCKbGB75h1d3Jlx9Gy4ZTfv.jpg",
      "status": "up_to_date",
      "followedAt": "2015-10-11T11:52:18Z"
    },
    "detail": {
      "tmdbId": 37863,
      "name": "Fullmetal Alchemist",
      "overview": "Two young brothers are raised as alchemists, but when they are severely injured trying to perform a forbidden act, they begin searching for the one thing that can save them; the fabled philosopher's stone.",
      "posterPath": "/kKOQbCKbGB75h1d3Jlx9Gy4ZTfv.jpg",
      "backdropPath": "/p1z1B4bMf6tgUA4VLpI4smLxbCf.jpg",
      "firstAirDate": "2003-10-04",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 51,
      "numberOfSeasons": 1,
      "episodeRuntime": 24,
      "genres": [
        "Animation",
        "Action & Adventure",
        "Sci-Fi & Fantasy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Season 1",
          "episodeCount": 51,
          "posterPath": "/grcCY5Le3KnYZgL05nkFAIb1K0b.jpg",
          "airDate": "2003-10-04"
        }
      ]
    },
    "watchedCount": 51
  },
  {
    "show": {
      "id": "demo-follow-15",
      "userId": "demo-user",
      "tmdbShowId": 11466,
      "tvdbId": null,
      "name": "Kaamelott",
      "posterPath": "/d6P4O0LzE4WFp4GnSkzauUTmC2P.jpg",
      "status": "stopped",
      "followedAt": "2017-09-08T19:49:50Z"
    },
    "detail": {
      "tmdbId": 11466,
      "name": "Kaamelott",
      "overview": "Kaamelott is a French comedy medieval fantasy television series created, directed, written, scored, and edited by Alexandre Astier, who also starred as the main character. The series, which originally ran for six seasons (referred to as 'books'), ran from January 3, 2005, to October 31, 2009, on M6.\n\nIn this offbeat account of King Arthur's quest for the Grail, virtually every journey, battle or adventure is stopped dead in its tracks by the knights of the round table's most worldly traits: cowardice, greed, idiocy or misplaced chivalry. As a consequence, instead of epic adventures we are treated with the characters' pragmatic and anachronistic take on each and every event in the Grail legend, true to the purest sitcom tradition.",
      "posterPath": "/d6P4O0LzE4WFp4GnSkzauUTmC2P.jpg",
      "backdropPath": "/1Tcv90k3MzWKsq1zJbxVlsT7YXr.jpg",
      "firstAirDate": "2005-01-03",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 458,
      "numberOfSeasons": 6,
      "episodeRuntime": 40,
      "genres": [
        "Comedy",
        "Drama",
        "Sci-Fi & Fantasy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Livre I",
          "episodeCount": 100,
          "posterPath": "/qRqS7gUwnHN7D55HWAKZTi634Sc.jpg",
          "airDate": "2005-01-03"
        },
        {
          "seasonNumber": 2,
          "name": "Livre II",
          "episodeCount": 100,
          "posterPath": "/qjZZ75qM9Fh89tUlfLkEXM3Re3E.jpg",
          "airDate": "2005-05-02"
        },
        {
          "seasonNumber": 3,
          "name": "Livre III",
          "episodeCount": 100,
          "posterPath": "/mbA9CHe52PHpyAHavd9eEWvJXK6.jpg",
          "airDate": "2006-01-09"
        },
        {
          "seasonNumber": 4,
          "name": "Livre IV",
          "episodeCount": 99,
          "posterPath": "/lDVCwyGM9smQE1o0q8oB3FTWTEj.jpg",
          "airDate": "2006-09-18"
        },
        {
          "seasonNumber": 5,
          "name": "Livre V",
          "episodeCount": 50,
          "posterPath": "/eKLf4vMGjSCWjHPpzqzsQwF2Kco.jpg",
          "airDate": "2007-05-01"
        },
        {
          "seasonNumber": 6,
          "name": "Livre VI",
          "episodeCount": 9,
          "posterPath": "/6x8CY9Hl2E9UCoZMryvZQxP8Di9.jpg",
          "airDate": "2009-10-17"
        }
      ]
    },
    "watchedCount": 92
  },
  {
    "show": {
      "id": "demo-follow-16",
      "userId": "demo-user",
      "tmdbShowId": 63174,
      "tvdbId": null,
      "name": "Lucifer",
      "posterPath": "/ekZobS8isE6mA53RAiGDG93hBxL.jpg",
      "status": "stopped",
      "followedAt": "2019-05-23T10:19:48Z"
    },
    "detail": {
      "tmdbId": 63174,
      "name": "Lucifer",
      "overview": "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
      "posterPath": "/ekZobS8isE6mA53RAiGDG93hBxL.jpg",
      "backdropPath": "/mAXOCbZzvmDa6PCh5dcIPOB51Qc.jpg",
      "firstAirDate": "2016-01-25",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 93,
      "numberOfSeasons": 6,
      "episodeRuntime": 45,
      "genres": [
        "Crime",
        "Sci-Fi & Fantasy"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Season 1",
          "episodeCount": 13,
          "posterPath": "/e6FQvm5jycG9xx1ZWowIYBc3Shn.jpg",
          "airDate": "2016-01-25"
        },
        {
          "seasonNumber": 2,
          "name": "Season 2",
          "episodeCount": 18,
          "posterPath": "/NhVsRaNhfXknIseUb2hY02gqom.jpg",
          "airDate": "2016-09-19"
        },
        {
          "seasonNumber": 3,
          "name": "Season 3",
          "episodeCount": 26,
          "posterPath": "/x4oi3N7JNF0QGtBzyLJjolivmWx.jpg",
          "airDate": "2017-10-02"
        },
        {
          "seasonNumber": 4,
          "name": "Season 4",
          "episodeCount": 10,
          "posterPath": "/4FoFVP6wpBNutIG2FyglQhySa7V.jpg",
          "airDate": "2019-05-08"
        },
        {
          "seasonNumber": 5,
          "name": "Season 5",
          "episodeCount": 16,
          "posterPath": "/f7uHY54huql9oIwMonFQd6Vylvd.jpg",
          "airDate": "2020-08-20"
        },
        {
          "seasonNumber": 6,
          "name": "Season 6",
          "episodeCount": 10,
          "posterPath": "/uHpfjWUJI2gXQIIxjgAvOZWJORx.jpg",
          "airDate": "2021-09-10"
        }
      ]
    },
    "watchedCount": 67
  },
  {
    "show": {
      "id": "demo-follow-17",
      "userId": "demo-user",
      "tmdbShowId": 83095,
      "tvdbId": null,
      "name": "The Rising of the Shield Hero",
      "posterPath": "/yjq2n0agGJfmZQ9NpbYIhuBofcq.jpg",
      "status": "watch_later",
      "followedAt": "2020-07-05T19:39:55Z"
    },
    "detail": {
      "tmdbId": 83095,
      "name": "The Rising of the Shield Hero",
      "overview": "Iwatani Naofumi, a run-of-the-mill otaku, finds a book in the library that summons him to another world. He is tasked with joining the sword, spear, and bow as one of the Four Cardinal Heroes and fighting the Waves of Catastrophe as the Shield Hero. Excited by the prospect of a grand adventure, Naofumi sets off with his party. However, merely a few days later, he is betrayed and loses all his money, dignity, and respect. Unable to trust anyone anymore, he employs a slave named Raphtalia and takes on the Waves and the world. But will he really find a way to overturn this desperate situation?",
      "posterPath": "/yjq2n0agGJfmZQ9NpbYIhuBofcq.jpg",
      "backdropPath": "/ygJ9BOiLwExwFdxQeZiiUA6TqME.jpg",
      "firstAirDate": "2019-01-09",
      "status": "Returning Series",
      "inProduction": true,
      "numberOfEpisodes": 62,
      "numberOfSeasons": 5,
      "episodeRuntime": 24,
      "genres": [
        "Animation",
        "Action & Adventure",
        "Sci-Fi & Fantasy",
        "Drama"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Season 1",
          "episodeCount": 25,
          "posterPath": "/iyJ1vrMt7Ipdrs0b9UVSFmueCVV.jpg",
          "airDate": "2019-01-09"
        },
        {
          "seasonNumber": 2,
          "name": "Season 2",
          "episodeCount": 13,
          "posterPath": "/3Z5jDBlcUtzM71YCsAw2u0kyVX6.jpg",
          "airDate": "2022-04-06"
        },
        {
          "seasonNumber": 3,
          "name": "Season 3",
          "episodeCount": 12,
          "posterPath": "/7wxRI61VaEmqtbyefHRN28eaXRp.jpg",
          "airDate": "2023-10-05"
        },
        {
          "seasonNumber": 4,
          "name": "Season 4",
          "episodeCount": 12,
          "posterPath": "/3tJZ53eTcxURzoJSirM6bCCkrb0.jpg",
          "airDate": "2025-07-09"
        },
        {
          "seasonNumber": 5,
          "name": "Season 5",
          "episodeCount": 0,
          "posterPath": null,
          "airDate": null
        }
      ]
    },
    "watchedCount": 0
  },
  {
    "show": {
      "id": "demo-follow-18",
      "userId": "demo-user",
      "tmdbShowId": 43865,
      "tvdbId": null,
      "name": "Psycho-Pass",
      "posterPath": "/uWnP6qTcc4imPJ9ZHaXlPQlcYnB.jpg",
      "status": "not_started",
      "followedAt": "2015-10-28T12:19:18Z"
    },
    "detail": {
      "tmdbId": 43865,
      "name": "Psycho-Pass",
      "overview": "In the year 2113, people are given brain scans to determine how likely they are to commit a crime. Those who fail are apprehended, or even killed.",
      "posterPath": "/uWnP6qTcc4imPJ9ZHaXlPQlcYnB.jpg",
      "backdropPath": "/2HtnTJLs3CDUTu6ug8rib5vNnU2.jpg",
      "firstAirDate": "2012-10-12",
      "status": "Ended",
      "inProduction": false,
      "numberOfEpisodes": 41,
      "numberOfSeasons": 3,
      "episodeRuntime": 28,
      "genres": [
        "Animation",
        "Crime",
        "Sci-Fi & Fantasy",
        "Action & Adventure"
      ],
      "seasons": [
        {
          "seasonNumber": 1,
          "name": "Season 1",
          "episodeCount": 22,
          "posterPath": "/oVfTwvfRBWPlpkIDg5GqgjoMTLr.jpg",
          "airDate": "2012-10-12"
        },
        {
          "seasonNumber": 2,
          "name": "Season 2",
          "episodeCount": 11,
          "posterPath": "/h2dhqb2RLTJr8gOcRJuCzHUdVFY.jpg",
          "airDate": "2014-10-10"
        },
        {
          "seasonNumber": 3,
          "name": "Season 3",
          "episodeCount": 8,
          "posterPath": "/yPUSYmmL7bFMJP1grAGnJhHSJMX.jpg",
          "airDate": "2019-10-25"
        }
      ]
    },
    "watchedCount": 0
  }
];

export const DEMO_WATCH_NEXT: DemoWatchNextSeed[] = [
  {
    "seed": 37854,
    "nextEpisode": {
      "seasonNumber": 22,
      "episodeNumber": 1093,
      "name": "The Winner Takes All! Law vs. Blackbeard!",
      "overview": "The Blackbeard Pirates ambushed the Heart Pirates led by Law. The Blackbeard Pirates’ top officers use a variety of formidable Devil Fruit powers and keep pushing the Heart Pirates in order to obtain the copies of the Road Ponegliffs.",
      "airDate": "2024-02-11",
      "stillPath": "/kXF511ZBtvC6IO3jS7D17IItNJD.jpg",
      "runtime": 24
    },
    "lastWatchedDaysAgo": 1
  },
  {
    "seed": 95479,
    "nextEpisode": {
      "seasonNumber": 1,
      "episodeNumber": 5,
      "name": "Curse Womb Must Die -II-",
      "overview": "As Sukuna gruesomely holds Yuji's body hostage, Fushiguro struggles against the sheer strength of Sukuna's curse to buy time until Yuji can awaken.",
      "airDate": "2020-10-31",
      "stillPath": "/xXIK0xhHMThQkSkbBMAznaUTubj.jpg",
      "runtime": 24
    },
    "lastWatchedDaysAgo": 2
  },
  {
    "seed": 57243,
    "nextEpisode": {
      "seasonNumber": 13,
      "episodeNumber": 5,
      "name": "Survivors of the Flux",
      "overview": "As the forces of evil mass, the Doctor, Yaz and Dan face perilous journeys and seemingly insurmountable obstacles in their quest for survival.",
      "airDate": "2021-11-28",
      "stillPath": "/jcEyyiqsYMLA2VdiZanEGfg8oQC.jpg",
      "runtime": 51
    },
    "lastWatchedDaysAgo": 4
  },
  {
    "seed": 94664,
    "nextEpisode": {
      "seasonNumber": 2,
      "episodeNumber": 5,
      "name": "Ranoa University of Magic",
      "overview": "Following the Man-God's advice, Rudeus enrolls in school. He reunites with an old friend and meets potential new enemies, but will he find what he seeks? And what does the future hold for him and the enigmatic \"Silent Fitz\"?",
      "airDate": "2023-08-07",
      "stillPath": "/1TEiOCt9F60YHrf378nVkBrdmO.jpg",
      "runtime": 24
    },
    "lastWatchedDaysAgo": 9
  },
  {
    "seed": 86031,
    "nextEpisode": {
      "seasonNumber": 3,
      "episodeNumber": 5,
      "name": "Science Vessel Perseus",
      "overview": "Kaseki's efforts to build the science vessel Perseus hit a roadblock when he realizes that it's impossible to get all the parts to fit in practice.",
      "airDate": "2023-05-04",
      "stillPath": "/3IjMInLbkq1mygdPzWSmj6Mrdp8.jpg",
      "runtime": 24
    },
    "lastWatchedDaysAgo": 16
  }
];

export const DEMO_RECENTLY_WATCHED: DemoRecentSeed[] = [
  {
    "tmdbShowId": 37854,
    "showName": "One Piece",
    "posterPath": "/dB4EDhre2dsC2kxYDavyKWqLQwi.jpg",
    "season": 22,
    "episode": 1092,
    "daysAgo": 1
  },
  {
    "tmdbShowId": 37854,
    "showName": "One Piece",
    "posterPath": "/dB4EDhre2dsC2kxYDavyKWqLQwi.jpg",
    "season": 22,
    "episode": 1091,
    "daysAgo": 2
  },
  {
    "tmdbShowId": 95479,
    "showName": "JUJUTSU KAISEN",
    "posterPath": "/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
    "season": 1,
    "episode": 4,
    "daysAgo": 2
  },
  {
    "tmdbShowId": 95479,
    "showName": "JUJUTSU KAISEN",
    "posterPath": "/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
    "season": 1,
    "episode": 3,
    "daysAgo": 3
  },
  {
    "tmdbShowId": 57243,
    "showName": "Doctor Who",
    "posterPath": "/m6G92osOtSeXwjSfL21jZCUOvxe.jpg",
    "season": 13,
    "episode": 4,
    "daysAgo": 4
  },
  {
    "tmdbShowId": 57243,
    "showName": "Doctor Who",
    "posterPath": "/m6G92osOtSeXwjSfL21jZCUOvxe.jpg",
    "season": 13,
    "episode": 3,
    "daysAgo": 5
  },
  {
    "tmdbShowId": 94664,
    "showName": "Mushoku Tensei: Jobless Reincarnation",
    "posterPath": "/gLKOYIMyKlUHW0SVdskhgf9C0yy.jpg",
    "season": 2,
    "episode": 4,
    "daysAgo": 9
  },
  {
    "tmdbShowId": 94664,
    "showName": "Mushoku Tensei: Jobless Reincarnation",
    "posterPath": "/gLKOYIMyKlUHW0SVdskhgf9C0yy.jpg",
    "season": 2,
    "episode": 3,
    "daysAgo": 10
  },
  {
    "tmdbShowId": 86031,
    "showName": "Dr. STONE",
    "posterPath": "/xbZQ3fDl0y5mt0ARwfeyrgQ4JTw.jpg",
    "season": 3,
    "episode": 4,
    "daysAgo": 16
  },
  {
    "tmdbShowId": 86031,
    "showName": "Dr. STONE",
    "posterPath": "/xbZQ3fDl0y5mt0ARwfeyrgQ4JTw.jpg",
    "season": 3,
    "episode": 3,
    "daysAgo": 17
  }
];

/** Épisodes réels par clé « tmdbShowId:saison » (les autres saisons sont synthétisées). */
export const DEMO_EPISODES: Record<string, CatalogEpisode[]> = {
  "37854:22": [
    {
      "seasonNumber": 22,
      "episodeNumber": 1089,
      "name": "Entering a New Chapter! Luffy and Sabo's Paths!",
      "overview": "Sabo, the Chief of Staff of the Revolutionary Army, contacts Koala and everyone in Kamabakka Queendom. He explains to them about the things that he is accused of, but someone who was eavesdropping on the call takes a stunning action.",
      "airDate": "2024-01-07",
      "stillPath": "/xqu9Y7WSUnoqhHxBDbcAmvqsSQF.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1090,
      "name": "A New Island! Future Island Egghead",
      "overview": "Luffy and Chopper fall into the rough cold sea along with the mysterious girl. Jimbei tries to help them but another attack comes from the unknown creature. Meanwhile, the Sunny is hit by torpedoes and the rest of the Straw Hats are thrown into the sea, too.",
      "airDate": "2024-01-14",
      "stillPath": "/2ftHdA46GzYZMoysJyGglJ2WbHN.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1091,
      "name": "Brimming with the Future! An Adventure on the Island of Science!",
      "overview": "A young girl who came out of the big robot names herself Dr. Vegapunk and it surprises Franky and the rest of the Straw Hats. Meanwhile, Luffy’s group gets to the surface of the island where futuristic buildings stand and unknown giant creatures wander about.",
      "airDate": "2024-01-21",
      "stillPath": "/nQuvUtA42WquJngPDQTWEU53AjQ.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1092,
      "name": "Bonney's Lamentation! Darkness Lurking on the Future Island",
      "overview": "While Luffy and the others are enjoying the futuristic machines of Egghead, someone who resembles Bartholomew Kuma comes after them. When Luffy tries to fight back, Bonney stops him and reveals her shocking relationship with Kuma.",
      "airDate": "2024-01-28",
      "stillPath": "/prIyXXClUwtyplzNVSxB1gVevWT.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1093,
      "name": "The Winner Takes All! Law vs. Blackbeard!",
      "overview": "The Blackbeard Pirates ambushed the Heart Pirates led by Law. The Blackbeard Pirates’ top officers use a variety of formidable Devil Fruit powers and keep pushing the Heart Pirates in order to obtain the copies of the Road Ponegliffs.",
      "airDate": "2024-02-11",
      "stillPath": "/kXF511ZBtvC6IO3jS7D17IItNJD.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1094,
      "name": "The Mystery Deepens! Egghead Labophase",
      "overview": "The Straw Hats without Luffy, Chopper, and Jimbei are taken to the laboratory on the clouds far above the ground by Lilith. They get excited about the things they've never seen before. However, inside the laboratory, a new threat is waiting for them.",
      "airDate": "2024-02-18",
      "stillPath": "/gmOhJhpy3wUFadCj4K0coZsuUX3.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1095,
      "name": "The Brain of a Genius - Six Vegapunks!",
      "overview": "Nami and the others are attacked by a Pacifista who resembles Jimbei and while they’re in battle, some of Vegapunk’s Satellites look on with excitement. Meanwhile, Luffy and the others find something extraordinary at the scrap heap.",
      "airDate": "2024-02-25",
      "stillPath": "/61mM6cjB2ml2Y87GS0R8y9JnD8c.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1096,
      "name": "A Forbidden Piece of History! A Theory Concerning a Kingdom",
      "overview": "Vegapunk Shaka shares with Robin and the others his theory about an ancient kingdom and the 100-Year Void. He even says that he visited Ohara after its destruction. Meanwhile, Luffy and Chopper try to activate the giant robot and something surprising happens.",
      "airDate": "2024-03-03",
      "stillPath": "/ruNS1Qlj2uH3FsviPYOORJVaS0u.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1097,
      "name": "The Will of Ohara! The Inherited Research",
      "overview": "Shaka reveals the secret behind the foundation of the Revolutionary Army and how the relationship between Vegapunk and Dragon affected it. Meanwhile, Vegapunk explains to Luffy and the others about his special power and how his clones work.",
      "airDate": "2024-03-17",
      "stillPath": "/b8wo7mmgK0rI7ud5AMelgiFPHcs.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1098,
      "name": "The Eccentric Dream of a Genius!",
      "overview": "Vegapunk reveals the shocking history of the ancient giant robot and asks Luffy to take him off Egghead. Rob Lucci and his fellow Cipher Pol agents arrive at the island and ask for permission to enter the port.",
      "airDate": "2024-03-24",
      "stillPath": "/yxBnnjCoPEY88rpaMwX3yYW1APo.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1099,
      "name": "Preparations for Interception! Rob Lucci Strikes!",
      "overview": "CP-0 led by Rob Lucci makes a forced landing at Egghead and people on the Fabriophase are plunged into confusion while Shaka and the others prepare to fight back on the Labophase. The enraged Atlas stands up to defend the peace of the island.",
      "airDate": "2024-03-31",
      "stillPath": "/3BivpPgym2uKGBnLdCbYGlsqUOu.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1100,
      "name": "Powers on a Different Level! Luffy vs. Lucci!",
      "overview": "Luffy transforms into the Warrior of Liberation as Rob Lucci also shows his awakened Devil Fruit form. As the two clash, Vegapunk reveals the shocking truth of the Gum-Gum Fruit and his eye-opening theory on Devil Fruits.",
      "airDate": "2024-04-07",
      "stillPath": "/uz8jhKVizqyJzOQsBZPYQ9iOeqb.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1101,
      "name": "The Strongest Form of Humanity! The Seraphim's Powers!",
      "overview": "Vegapunk describes how he managed to grant the Seraphim Devil Fruit powers, which surprises Franky and the others. Meanwhile, Luffy is still facing Lucci in his savage, awakened form, but the rocket to the Labophase is about to leave.",
      "airDate": "2024-04-21",
      "stillPath": "/fTRU8YQFnk9qieapxEqnJNRjzau.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1102,
      "name": "Sinister Schemes! The Operation to Escape Egghead",
      "overview": "Vegapunk asks the Straw Hats to take him on board their ship which makes Franky and Usopp happy but annoys Nami. Lucci orders his troops to block off all Vegapunk’s escape routes and looks to invade the heavily-secured Labophase.",
      "airDate": "2024-04-28",
      "stillPath": "/xH6ivywyYUseKcEWjxQcG25e8pb.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1103,
      "name": "Turn Back My Father! Bonney's Futile Wish!",
      "overview": "CP-0 enters the Labophase and starts attacking the Thousand Sunny as soon as they find it. Luffy reunites with Nami and the others but finds out that Vegapunk is missing. Meanwhile, Bonney is pressing Vegapunk to change back her father Kuma.",
      "airDate": "2024-05-05",
      "stillPath": "/23PQHyvml7mRdd2NO6aG2Duk2uj.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1104,
      "name": "A Desperate Situation! The Seraphim's All-out Attack!",
      "overview": "The Seraphim come following CP-0 to the Labophase, pitting Zoro and Brook against the seven of them. Sanji, Franky, Edison, and Lilith leave the lab to fight them, but the Seraphim launch a full-scale attack on the lab.",
      "airDate": "2024-05-12",
      "stillPath": "/iXBb9JFsRqZqhr0JDvlCBjsDRkS.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1105,
      "name": "A Beautiful Act of Treason! The Spy, Stussy",
      "overview": "Stussy suddenly knocked out Lucci to the Straw Hats’ surprise, and when Shaka reveals her true identity, they’re stunned again. Meanwhile, a major incident occurs on an island called Sphinx where Whitebeard came from.",
      "airDate": "2024-05-19",
      "stillPath": "/zxRrM53l8kb01ToXUEH1StZDcNZ.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1106,
      "name": "Trouble Occurs! Seek Dr. Vegapunk!",
      "overview": "CP-0 takes control of the Fabriophase but gets attacked by an unknown force. Meanwhile, in the Labophase, the Straw Hats and Dr. Vegapunk’s Satellites find out that Vegapunk has disappeared and begin searching for him.",
      "airDate": "2024-05-26",
      "stillPath": "/eNFohNn1p8S2P7vkdJbuv5rpnVs.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1107,
      "name": "A Shudder! The Evil Hand Creeping Up on the Laboratory",
      "overview": "Bonney witnesses her father Bartholomew Kuma’s painful memories. Meanwhile at the lab, Shaka notices that their communications and surveillance cameras are being cut off by somebody.",
      "airDate": "2024-06-02",
      "stillPath": "/s0y56j5SvNvzQtZpaaMPCYvvN51.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1108,
      "name": "Incomprehensible! The Seraphim's Rebellion!",
      "overview": "The Seraphim suddenly start attacking the Straw Hats and the Vegapunk Satellites. They are not stopping even when the Satellites order them to. When Luffy and Zoro are cornered, Lucci and Kaku wake up and make them a surprising offer.",
      "airDate": "2024-06-09",
      "stillPath": "/c9V8mICeFKgYGcM8XWKcdrkqZtq.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1109,
      "name": "A Tough Decision! An Unusual United Front!",
      "overview": "Lucci and Kaku from CP-0, who came to Egghead with a mission to eliminate the seven Vegapunks, ask Luffy and Zoro to uncuff them so they can fight alongside them against the Seraphim, but Luffy and Zoro are reluctant to do so.",
      "airDate": "2024-06-23",
      "stillPath": "/ltm4dY6bQD4KQPbyTcLv2ARsPOs.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1110,
      "name": "Survive! Deadly Combat with the Strongest Form of Humanity!",
      "overview": "The Straw Hats and CP-0 relentlessly attack the Seraphim, but the Seraphim keep getting back up. Then, Zoro notices that the Seraphim remind him of someone who he fought before. Meanwhile, Shaka goes to check one place where he thinks Vegapunk Stella might be.",
      "airDate": "2024-06-30",
      "stillPath": "/gMvNGRHx0irAA8KwpUD7bbxs5JH.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1111,
      "name": "The Second Ohara! The Mastermind's Ambition!",
      "overview": "Stussy and Sentomaru discuss how big the threat that closes in on Egghead is as Luffy and the others keep fighting the uncontrollable Seraphim. Meanwhile, in an underground lab, someone approaches Vegapunk, who is being held captive.",
      "airDate": "2024-07-07",
      "stillPath": "/mdRKKi7ExhibWeLc3YoR23ZK8rc.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1112,
      "name": "Clash! Shanks vs. Eustass Kid",
      "overview": "Kid gives his crew a pep talk before the battle with Shanks. And Shanks also prepares for the battle but learns how his own subordinates do as they like to protect their beloved boss. Finally, Kid has his Damned Punk ready to shoot.",
      "airDate": "2024-07-14",
      "stillPath": "/jxNm09Okg1eEWlmc6fdOOYBnVau.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1113,
      "name": "Run, Koby! A Desperate Escape Strategy!",
      "overview": "Perona breaks into the Blackbeard Pirates' prison to rescue her captain, Gecko Moria, and frees Koby, who then helps free other prisoners. Koby, now with a high bounty, distracts a mob of pirates to protect the others. He recalls Blackbeard's plan to trade him for Hachinosu's entry into the World Government. The pirates face attacks from clay golems, SWORD member Kujaku, and a Marine force led by Garp and Tashigi.",
      "airDate": "2024-07-28",
      "stillPath": "/78arp3lM6IVbuWGudMMKfkWdi4w.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1114,
      "name": "For the Beloved Pupil - The Fist of Vice Admiral Garp!",
      "overview": "A massive warship comes flying towards the Pirate Island of Beehive and Vice Admiral Garp launches a crushing attack on top of it to save his pupil Koby. Koby almost reaches the ship with Navy HQ Commander Hibari running by his side.",
      "airDate": "2024-08-04",
      "stillPath": "/7YAkyVNGhqkkxzD8b3CAgWWe4nj.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1115,
      "name": "The Navy Surprised! The Navy Headquarters' Former Admiral, Kuzan",
      "overview": "Kuzan, a former Navy Admiral, stands in the way of Garp who came to rescue Koby. He was once Garp’s pupil but is now a member of the Blackbeard Pirates. What happened to him after he was defeated by Sakazuki is now revealed.",
      "airDate": "2024-08-11",
      "stillPath": "/urhtfC51n74mAGwJB17MzfwjK08.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1116,
      "name": "Let's Go Get It! Buggy's Big Declaration",
      "overview": "Sengoku, the former Admiral of the Fleet, and Great Adviser Tsuru discuss the murder of Vice Admiral T-Bone and concerns about Cross Guild. Meanwhile, Buggy gives a passionate speech to Crocodile, Mihawk, and his crew.",
      "airDate": "2024-08-18",
      "stillPath": "/3dXW32hhlVGXvFg4jWyi9pK4Xzk.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1117,
      "name": "Sabo Returns - The Shocking Truth to Be Told!",
      "overview": "Sabo returns to Kamabakka Queendom and starts recounting what happened at the Holy Land Mary Geoise. A month ago, during the Reverie, he and the captains of the Revolutionary Army raided the Land of Gods and Sabo witnessed Bartholomew Kuma being the Celestial Dragons’ slave.",
      "airDate": "2024-09-01",
      "stillPath": "/1E6w4HgaK2RBOeyoXqK8I1ivMCG.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1118,
      "name": "The Holy Land in Tumult! Sai and Leo's Full-Power Blow!",
      "overview": "In the Holy Land Mary Geoise during the Reverie, Sabo runs into Bartholomew Kuma’s daughter Bonney. Meanwhile, King Cobra of the Kingdom of Alabasta begins asking the Five Elders questions that trouble them.",
      "airDate": "2024-09-08",
      "stillPath": "/kBBZbiH4yeR5xOoP6MMFlKUrCW4.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1119,
      "name": "The Entrusted Message! King Cobra’s Resolve",
      "overview": "King Cobra is surprised by seeing someone sitting on the Empty Throne and by learning about the truth of the world. When he is subject to a deadly attack, Sabo cuts in to save him. The injured king entrusts Sabo with a message.",
      "airDate": "2024-09-15",
      "stillPath": "/3Z3biYOj9qCLYX1qtorQAD7Qr6t.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1120,
      "name": "The World Is Shaken! The Ruler's Judgment and the Five Elders' Actions!",
      "overview": "Vivi tries to escape the Holy Land Mary Geoise with Wapol while the injured Sabo also looks for a way to leave to deliver King Cobra’s message to Luffy and Vivi. Meanwhile, Imu orders the Five Elders to test a horrendous weapon.",
      "airDate": "2024-09-22",
      "stillPath": "/yoP85GmEIZAvUpEQuYJsdEspHQY.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1121,
      "name": "Garp and Kuzan - A Master and a Pupil's Beliefs Clash",
      "overview": "At the Pirate Island of Beehive, Vice Admiral Garp, who came to rescue the kidnapped Koby, deals with an overwhelming number of pirates alone. As he and his fellow Navy soldiers try to escape the island, Kuzan, the former Navy admiral, stands in their way.",
      "airDate": "2024-10-06",
      "stillPath": "/mKFgxWrrWJc9QoiSQJkiymLVM0g.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1122,
      "name": "The Last Lesson! Impact Inherited",
      "overview": "Avalo Pizarro, who merged with the Pirate Island, reaches his giant hand to crush the Navy ship with many soldiers and civilians on board. The wounded Garp gives orders to Koby, Helmeppo, and Prince Grus, and delivers a powerful blow to save the ship.",
      "airDate": "2024-10-13",
      "stillPath": "/sSeTlMDsf9M1o8Dql1S8F1nM6L4.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1123,
      "name": "The World Shakes! The Straw Hats' Hostage Situation",
      "overview": "As the news about Garp’s disappearance and Luffy’s hostage situation spreads, a mysterious earthquake suddenly shakes the entire world. Meanwhile, a huge Navy fleet led by Admiral Kizaru surrounds Egghead and listens in as York contacts Mary Geoise to negotiate a deal.",
      "airDate": "2025-04-05",
      "stillPath": "/5VFdmFzQdmpre1o9qtAqoLXOzsl.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1124,
      "name": "Completely Surrounded! The Operation to Escape Egghead",
      "overview": "In the Labophase on Egghead, which is completely surrounded by the Navy, Luffy and the others devise a plan to escape the island. However, the Frontier Dome, the laser defense system, cannot be deactivated without York’s secret passcode.",
      "airDate": "2025-04-06",
      "stillPath": "/jjR36oiRnNf9Ckw6RYXB6kTK6Jp.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1125,
      "name": "A Clash of Two Men's Determination! Kizaru and Sentomaru",
      "overview": "Navy Admiral Kizaru finally makes landfall on Egghead and Sentomaru, Vegapunk’s bodyguard, stands in his way. The two men who were once close now clash violently. Meanwhile, Luffy and the others try their best to move the Sunny to the back side of the island to escape.",
      "airDate": "2025-04-13",
      "stillPath": "/ll38LCEtwZecUAldRTjMOHTITmR.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1126,
      "name": "Looming Despair! Admiral Kizaru's Depressing Mission",
      "overview": "Kuma finally reaches Mary Geoise and keeps advancing even without free will or mind. But Fleet Admiral Akainu stands in his way. On Egghead, Kizaru enters the Labophase and delivers a powerful kick to Luffy who tries to stop him.",
      "airDate": "2025-04-20",
      "stillPath": "/7zrYpzUPZste7ebAnkV6CHIB4eV.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1127,
      "name": "Luffy vs. Kizaru!  A Fierce Kaleidoscopic Battle",
      "overview": "A bizarre battle between Luffy and Kizaru heats up. Meanwhile, in the Fabiriophase, Bonney is all alone and being chased by the Navy soldiers. Dr. Vegapunk sees this and can’t help but leave the Labophase to rescue her, risking his life.",
      "airDate": "2025-04-27",
      "stillPath": "/deQ3PJEupN1Relx9oF8OdGv1aMj.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1128,
      "name": "The Nightmare Strikes - Godhead of Science & Defense, St. Saturn",
      "overview": "Vegapunk successfully wrests back the Pacifistas from the Navy, but another party soon gains control of them. At the same time, Luffy, Zoro, and the others sense an unearthly presence just as a pentagram suddenly appears on Egghead.",
      "airDate": "2025-05-04",
      "stillPath": "/iDH1dtY8kXPTvuOrGY46YoreFym.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1129,
      "name": "Kuma's Past - Better Off Dead in This World",
      "overview": "Bonney gets captured by St. Saturn, whose enigmatic power keeps Sanji and Franky from saving her. In St. Saturn's clenched fist, she recalls the memories of her father, Kuma. 47 years ago, Kuma was born to a father of a race on the verge of extinction.",
      "airDate": "2025-05-18",
      "stillPath": "/3wBSkxU0bszsGtdMwPMnMV4V8cR.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1130,
      "name": "A History Erased! God Valley of Despair",
      "overview": "The human hunt begins and the Celestial Dragons start chasing locals of God Valley and slaves for prizes. Ivankov and Ginny share with Kuma and the others their surprising plan to survive the game. Meanwhile, ships full of infamous pirates start arriving on the island one after another.",
      "airDate": "2025-05-25",
      "stillPath": "/cI5FzwsqEWn1MiEOfxY4ySynAu3.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1131,
      "name": "A Fleeting Moment of Happiness - Kumachi and Ginny",
      "overview": "Kuma and Ginny live peacefully in the Sorbet Kingdom eight years after the God Valley Incident. However, their new king initiates a policy of enslaving the poor. Kuma tries to free those who were captured but ends up being imprisoned himself. But a familiar face comes to rescue him.",
      "airDate": "2025-06-01",
      "stillPath": "/oILW8VJ7aTgMdfb3D4kjMcfVCx.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1132,
      "name": "A Pledge to Ginny - Kuma Becomes a Father",
      "overview": "Two years after Ginny’s abduction, the Revolutionary Army suddenly receives a call from her.",
      "airDate": "2025-06-08",
      "stillPath": "/gxy3COlCp0YRN8QM0mIlV1dAoUI.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1133,
      "name": "To Save His Daughter - Kuma the Timid Pacifist",
      "overview": "By fighting off King Bekori who is supported by the World Government, Kuma is put on the wanted list and decides to travel around the world in search of a cure for Bonney's disease. He reunites with Dragon and learns about the Government’s eccentric scientist who might be able to cure Bonney.",
      "airDate": "2025-06-15",
      "stillPath": "/aAG6wkxYq1Evijs6NxAZ7LUMLRb.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1134,
      "name": "Cruel Fate - Kuma's Decision as a Father",
      "overview": "Taking advantage of Kuma’s love for his daughter Bonney, the World Government imposes three harsh conditions on him in exchange for her treatment. Kuma agrees to them and Bonney’s treatment starts at Laboratory 8 in tandem with the clone development with which Kuma agrees to cooperate.",
      "airDate": "2025-06-29",
      "stillPath": "/9gMX88GU7ohYmYrTkXJB8tfZuQc.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1135,
      "name": "To the Sea Where My Father Is! The Future Bonney Chooses",
      "overview": "Bonney has been waiting for a letter from her father Kuma who promised to write to her. But with no letters in sight, she turns nine and one day realizes her disease is cured. She then decides to go out to sea to search for her father.",
      "airDate": "2025-07-06",
      "stillPath": "/n0qgDDFqr3caUmahReG7MRcgFjb.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1136,
      "name": "Kuma's Life",
      "overview": "Bonney sails out to sea in search of her father and rises to prominence. At the same time, Luffy makes his name by defeating the Arlong Pirates and declaring war against the World Government. Watching his actions, Kuma begins to hold a certain belief.",
      "airDate": "2025-07-13",
      "stillPath": "/4eUuLXIJxJwoiqQRegSaGiC63ar.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1137,
      "name": "I'm Sorry, Dad - Bonney's Tears and Kuma's Fist",
      "overview": "The present day on Egghead, Bonney is caught in St. Saturn’s grasp, knowing he is responsible for her father’s transformation into a cyborg. However, Saturn reveals an even more shocking truth that throws Bonney into despair.",
      "airDate": "2025-07-27",
      "stillPath": "/90EzlaBbgdtzeKJXnS2K8VIApZw.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1138,
      "name": "Thank You, Dad - Bonney and Kuma's Warm Embrace",
      "overview": "Kuma, battered and without free will, approaches Bonney. Overcome with emotion, she tells him she saw all his memories and learned everything that he did for her. Watching the scene, Vegapunk wonders what compelled Kuma to come to Egghead.",
      "airDate": "2025-08-03",
      "stillPath": "/jm7cyAA21RO5hF0pYSszV1AB8rF.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1139,
      "name": "Destroy Egghead - The Buster Call Is Invoked",
      "overview": "As an order comes down to evacuate the island in preparation for bombardment, Navy soldiers rush to their ships. Meanwhile, Vegapunk pleads with Saturn to halt the attack, arguing how vital the island is for the future of humanity, but Saturn refuses to listen.",
      "airDate": "2025-08-10",
      "stillPath": "/7VhvUUOeDXvj8dvdOTeJQ1ENcRr.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1140,
      "name": "An Admired Hero - The Warrior of Liberation Who Saves Bonney",
      "overview": "Vegapunk reveals the secret he alone has been keeping regarding the Pacifistas. Meanwhile, Bonney, her back against the wall, hears a familiar rhythm. It’s the rhythm that her father taught her along with the legend of the hero he admired.",
      "airDate": "2025-08-17",
      "stillPath": "/kOIVpVaGzEdi1ztAdYO2ggKrV8N.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1141,
      "name": "Reliable Reinforcements! Dorry and Brogy Arrive!",
      "overview": "The Giant Pirate Crew led by Dorry and Brogy arrive at Egghead, which deeply moves Usopp and the others. Zoro keeps fighting Rob Lucci and the Pacifistas continues to torment the Navy while Luffy shows Bonney how to throw a real punch.",
      "airDate": "2025-08-24",
      "stillPath": "/tTfBBlkAYiw7md3jySZDMnAyG52.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1142,
      "name": "Come In, World - Vegapunk's Message",
      "overview": "Caribou begs Augur and Devon to let him meet Blackbeard. An order is given to the Navy vice admirals to kill Jewelry Bonney at all costs in order to take back control over the Pacifistas. Sanji flees with the injured Vegapunk while Luffy holds St. Saturn back.",
      "airDate": "2025-09-07",
      "stillPath": "/8SazTeHul9T3oqT5hrx7JpBW5lK.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1143,
      "name": "Vegapunk's Secret Plan - A Tense Worldwide Broadcast",
      "overview": "Suddenly, Vegapunk’s broadcast begins and the whole world is taken by surprise. As everyone rushes to set up Video Transponder Snails and screens to watch it, the Five Elders grow concerned and discuss countermeasures.",
      "airDate": "2025-09-14",
      "stillPath": "/1u0tCSau3FEWwmPyXbCd98ZhQi2.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1144,
      "name": "The Worst Nightmare - The Five Elders Come Together",
      "overview": "Just like when St. Saturn emerged on Egghead, black lightning strikes and pentagrams appear again. The Pacifistas are rendered immobile by an unknown shadow. Meanwhile, as the time for the Straw Hats to evacuate the island is drawing near, the fight between Zoro and Lucci intensifies.",
      "airDate": "2025-09-21",
      "stillPath": "/qA3J5TQQfqMazFrJuim5VU8CDmy.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1145,
      "name": "Friends Fight Together! Luffy and the Warriors of Elbaph",
      "overview": "Dorry and Brogy finally reunite with Luffy. However, they are still facing St. Saturn and St. Warcury in their alternate forms. Dorry blows a horn to alert his people to prepare to escape, but St. Warcury unleashes a deafening roar.",
      "airDate": "2025-09-28",
      "stillPath": "/ppKBtFMcrOmVOfXfbBb1OeMIErs.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1146,
      "name": "An Imminent Threat - Stussy and Edison's Resolve",
      "overview": "Franky and Bonney clash with Navy vice admirals in front of the Elbaph ship. St. Mars tries to find the room from Vegapunk’s broadcast. The heavily injured Stussy tells Kaku the reason she chose to stay behind while Edison takes desperate action to help the Straw Hats escape.",
      "airDate": "2025-10-19",
      "stillPath": "/2rMc7ZPlankA3Te59475SpqBhwO.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1147,
      "name": "A Stunning Conclusion - Vegapunk's Great Prediction",
      "overview": "Vegapunk’s broadcast resumes as people in various locations all over the world listen closely. St. Mars rushes to find the Transponder Snail that is the source of the broadcast while the Straw Hats and their allies clash with the other members of the Five Elders.",
      "airDate": "2025-10-26",
      "stillPath": "/3fwvdemOmivvGwJdQ9AEepsXR1U.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1148,
      "name": "The Lost History - Joyboy, the First Pirate",
      "overview": "Vegapunk's revelation sends shockwaves around the world. St. Saturn abandons his fight with Nami and the others and rushes to stop the broadcast at all costs. Vegapunk goes on to expose another stunning truth, this time about Joyboy, the first pirate.",
      "airDate": "2025-11-02",
      "stillPath": "/6xjzfkWhIsDwLkUOsQ9Wirs48ET.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1149,
      "name": "The Void Century - A Revelation About a Sinking World",
      "overview": "The severely injured Edison begs Stussy to escape, but she makes a stunning request in exchange. Meanwhile, Vegapunk presents another astonishing disclosure about a past cataclysm and the Ancient Weapons that will fundamentally challenge the beliefs of people everywhere.",
      "airDate": "2025-11-09",
      "stillPath": "/oE2BzkOLiLD2Q8ikGLUmqFT3pe0.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1150,
      "name": "Get the Ship Moving! The Iron Giant Activates",
      "overview": "Vegapunk’s revelation shocks even Koby and his fellow SWORD members, leading them to discuss what to do next.",
      "airDate": "2025-11-16",
      "stillPath": "/lMeYmiLl8iJ89CPtyGNCysqktNS.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1151,
      "name": "Her and Her Father's Dream! Bonney's Free Future",
      "overview": "Luffy finally hops on the Elbaph ship along with Dorry and Brogy, but the Five Elders catch up to them and begin their assault. Aboard the burning ship, Bonney hears a familiar sound and then finds a new strength in her memories of her father.",
      "airDate": "2025-11-30",
      "stillPath": "/8MVL8WdJoeg7rHqfsu2SPZiP768.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1152,
      "name": "Her Father and Mother's Legacy! Bonney's Nika Punch",
      "overview": "Zoro and the others who are on the Sunny in the Labophase finally attempt to escape, but at the cost of an unexpected sacrifice. Meanwhile, as Vegapunk concludes his speech, Bonney once again faces St. Saturn, the object of her great hatred.",
      "airDate": "2025-12-07",
      "stillPath": "/vJjzc6shujgrT0rwBzyW0Zf4Ktr.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1153,
      "name": "The Upheaval of an Era! The Color of the Supreme King That Leads Luffy",
      "overview": "Vegapunk's speech raises the spirits of the pirates across the world, infuriating the Navy and the civilians. However, the broadcast is suddenly cut off while Vegapunk is still speaking. Meanwhile, off the coast of Egghead, the Five Elders are about to deliver the Straw Hats and the Giants a deadly strike.",
      "airDate": "2025-12-14",
      "stillPath": "/hM9QAcQgeqKQE92qrm5kFUk6xAG.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1154,
      "name": "The Truth Behind the Secret Plan - Vegapunk Claims Victory",
      "overview": "Two weeks before the battle erupted on Egghead, Vegapunk found out someone stole a portion of the Mother Flame. Along with Pythagoras and Shaka, he launched an investigation and identified the culprit, also learning their shocking motivation. Then, for the future of humanity, he resolved himself to make a bold decision.",
      "airDate": "2025-12-21",
      "stillPath": "/2kqvOa0sBwe2srPSm9drZZanXLE.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 22,
      "episodeNumber": 1155,
      "name": "The Promised Horizon - Off to the Long-Awaited Elbaph!",
      "overview": "York wakes up to see Island Clouds rising, and to her surprise, something is about to be taken away. Meanwhile, at Mary Geoise, the Celestial Dragons realize their food stock is dwindling and become belligerent. Another one of Vegapunk’s Satellites, Lilith wakes up and receives astonishing news.",
      "airDate": "2025-12-28",
      "stillPath": "/xosrmqNwXU6gJhz5LmIMCFrZkGm.jpg",
      "runtime": 24
    }
  ],
  "95479:1": [
    {
      "seasonNumber": 1,
      "episodeNumber": 1,
      "name": "Ryomen Sukuna",
      "overview": "After visiting his beloved grandfather in the hospital, Yuji Itadori encounters an apprentice sorcerer who demands that Yuji hand over a cursed relic.",
      "airDate": "2020-10-03",
      "stillPath": "/uLhqy9kb9jieoeGMq1aqOl7F7L.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 2,
      "name": "For Myself",
      "overview": "Yuji manages to control the curse of Ryomen Sukuna. Later, he awakens in a room with Jujutsu High teacher Satoru Gojo, who offers him a deadly choice.",
      "airDate": "2020-10-10",
      "stillPath": "/k5U9vkpy31UiqCkEc6x6OPBBB0R.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 3,
      "name": "Girl of Steel",
      "overview": "Nobara Kugisaki joins the class on a trip to Roppongi where Gojo gives her and Yuji their first test: dispel a curse from an abandoned building.",
      "airDate": "2020-10-17",
      "stillPath": "/foMCHRzZVfCTvrmfWWeWViBzvZH.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 4,
      "name": "Curse Womb Must Die",
      "overview": "When a curse womb attacks a juvenile detention center, Yuji's group is called upon to rescue any remaining survivors — but combat isn’t an option.",
      "airDate": "2020-10-24",
      "stillPath": "/7AxWD8EGwgurIeNoS40YidIlbcT.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 5,
      "name": "Curse Womb Must Die -II-",
      "overview": "As Sukuna gruesomely holds Yuji's body hostage, Fushiguro struggles against the sheer strength of Sukuna's curse to buy time until Yuji can awaken.",
      "airDate": "2020-10-31",
      "stillPath": "/xXIK0xhHMThQkSkbBMAznaUTubj.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 6,
      "name": "After Rain",
      "overview": "Sukuna tells Yuji that he will bring him back to life on two conditions. Meanwhile, Suguru Geto and a cursed spirit discuss their plans for Gojo.",
      "airDate": "2020-11-07",
      "stillPath": "/p7iB7X4BBr1vxeIjfeIelKZWaeS.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 7,
      "name": "Assault",
      "overview": "The cursed spirit Jogo attacks Gojo, who has such little trouble fighting back that he leaves and brings back a student to observe the battle.",
      "airDate": "2020-11-14",
      "stillPath": "/ggoWW4AChFzqNkVNr941EhRqTiX.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 8,
      "name": "Boredom",
      "overview": "As Kugisaki and Fushiguro train for the exchange event, two older students from the Kyoto Jujutsu school arrive in Tokyo and pick a fight with them.",
      "airDate": "2020-11-21",
      "stillPath": "/6RmiWPTEzDIOLmGI3zYo2GqVeOW.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 9,
      "name": "Small Fry and Reverse Retribution",
      "overview": "High schooler Junpei Yoshino finds his bullies horrifically killed in a movie theater. Sorcerer Kento Nanami and Yuji investigate the crime scene.",
      "airDate": "2020-11-28",
      "stillPath": "/2oiKacR5YLtv7dr6lyjoyUif1Za.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 10,
      "name": "Idle Transfiguration",
      "overview": "Junpei gets some startling advice from Mahito. Later, Ijichi and Yuji track down Junpei and formulate a plan to set up a chance encounter with him.",
      "airDate": "2020-12-05",
      "stillPath": "/rYa2K1q24GNb3dgAvgZm6K6OTzj.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 11,
      "name": "Narrow-minded",
      "overview": "Annoyed at having to work off the clock, Nanami shows Mahito the true potential of his sorcery. Meanwhile, Yuji and Junpei bond over movies.",
      "airDate": "2020-12-12",
      "stillPath": "/dVRE3XvFfgm8BRww4AqxokPMds1.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 12,
      "name": "To You, Someday",
      "overview": "Ignoring Nanami's warning, Yuji dashes into the school and tries to reason with Junpei, but Mahito soon interrupts. Yuji appeals to Sukuna for help.",
      "airDate": "2020-12-19",
      "stillPath": "/toPm43S9jRbpOnU6JetStwUTFj6.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 13,
      "name": "Tomorrow",
      "overview": "Yuji and Nanami coordinate their attacks on Mahito, wearing him down. But as the cursed spirit approaches death, he finds a new power within himself.",
      "airDate": "2020-12-26",
      "stillPath": "/5L3jkgKkzPvECLSiOxAqA4MIIiP.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 14,
      "name": "Kyoto Sister School Exchange Event - Group Battle 0 -",
      "overview": "With the exchange event between the Tokyo and Kyoto Jujutsu schools set to begin, Gojo arranges for Yuji to make a surprise appearance.",
      "airDate": "2021-01-16",
      "stillPath": "/wzimi19uWzAboYzDjYUDpdhEMUO.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 15,
      "name": "Kyoto Sister School Exchange Event - Group Battle 1 -",
      "overview": "Shortly after the exchange event team battle begins, Todo ambushes the Tokyo students. Yuji moves to stop him but soon finds himself surrounded.",
      "airDate": "2021-01-23",
      "stillPath": "/hoZfRWj2ROpzPnuKf45CUPzCRQE.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 16,
      "name": "Kyoto Sister School Exchange Event - Group Battle 2 -",
      "overview": "Todo gives Yuji advice on how to better tap into his curse powers. After Kugisaki taunts Nishimiya, Panda fights the remote-controlled Mechamaru.",
      "airDate": "2021-01-30",
      "stillPath": "/bDM0qdyzYUMhNpIH9AUkz7okbRE.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 17,
      "name": "Kyoto Sister School Exchange Event - Group Battle 3 -",
      "overview": "While Miwa struggles to stand her ground against Maki's attacks, Kugisaki chases down a flying Nishimiya, who lectures her about Mai's hardships.",
      "airDate": "2021-02-06",
      "stillPath": "/7BMedKvP6i1wIK7vLgL3v2BnRHe.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 18,
      "name": "Sage",
      "overview": "Fushiguro dodges Kamo's barrage of arrows but his opponent proves just as formidable in close combat. Meanwhile, Inumaki senses a foreboding presence.",
      "airDate": "2021-02-13",
      "stillPath": "/haxqbRAfpDuS9MIEBk9ToRLNuxt.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 19,
      "name": "Black Flash",
      "overview": "Inumaki, Fushiguro and Kamo struggle to hold their own against special grade cursed spirit Hanami, but Maki arrives to provide much-needed backup.",
      "airDate": "2021-02-20",
      "stillPath": "/qpDxYXnn0ZkoLPz0lB6iQZVIkHM.jpg",
      "runtime": 26
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 20,
      "name": "Nonstandard",
      "overview": "After analyzing Hanami's assortment of skills with his self-proclaimed intellect, Todo uses his disorienting technique to attack in tandem with Yuji.",
      "airDate": "2021-02-27",
      "stillPath": "/f15D3bnszZigSKbc85wL8ItwLKn.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 21,
      "name": "Jujutsu Koshien",
      "overview": "After the event's interruption, the school tournament continues with a baseball match.",
      "airDate": "2021-03-06",
      "stillPath": "/jhTrnQKXpc7rxDwM1Wm7ulKf71P.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 22,
      "name": "The Origin of Blind Obedience",
      "overview": "An investigation into a string of curse-related killings leads Yuji, Fushiguro and Kugisaki to the victims' – and Fushiguro's – former middle school.",
      "airDate": "2021-03-13",
      "stillPath": "/oYPvSsCDALfVeQ5goo1aPibYiXm.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 23,
      "name": "The Origin of Blind Obedience -II-",
      "overview": "Fushiguro, Kugisaki and Itadori fight the cursed spirits on two fronts. When Fushiguro faces his enemy alone, he recalls his recent training with Gojo. He knows that he has to be able to surpass himself...",
      "airDate": "2021-03-20",
      "stillPath": "/eLxlqoRzD7HPe8JgiJd5iGpXpaf.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 24,
      "name": "Accomplices",
      "overview": "Yuji and Nobara's battle against the Death Painting Wombs Kechizu and Eso reaches its conclusion! However, even in victory there is a cost in killing, something the Jujutsu High students had never considered before. Meanwhile, Choso, Geto and Mahito gain wind of this event.",
      "airDate": "2021-03-27",
      "stillPath": "/zIG6nADGUqJYDBXEsDaYyzYjHgH.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 25,
      "name": "Hidden Inventory",
      "overview": "The jujutsu sorcerers Iori Utahime and Mei Mei are dispatched to an ominous manor where several people have gone missing. They infiltrate the manor and attempt to destroy the cursed spirit's barrier, but suddenly the building starts to crumble.",
      "airDate": "2023-07-06",
      "stillPath": "/wR1ss0SiN0EjKOPgrGfCm9FzdVD.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 26,
      "name": "Hidden Inventory 2",
      "overview": "Gojo and Geto are assigned to the mission of escorting and erasing the young girl compatible with the Tengen - the Star Plasma Vessel. Amanai Riko is being targeted by the Curse User Group Q, and the religious cult the Star Religious Group.",
      "airDate": "2023-07-13",
      "stillPath": "/xNMW94wR8jfsXZbMK3XD2ftOUd0.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 27,
      "name": "Hidden Inventory 3",
      "overview": "Gojo and Geto beat back the curse users after the bounty placed on Amanai's head when her cell phone rings. A captured Kuroi is displayed on her phone. Gojo tries to bring Amanai back to Jujutsu High, but she insists on going to the negotiations herself.",
      "airDate": "2023-07-20",
      "stillPath": "/hiWLnViLZISiSWmMi5aLUcWz79M.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 28,
      "name": "Hidden Inventory 4",
      "overview": "\"Let's go home, Riko-chan.\" The moment Geto extends a hand to Amanai, the worst that could possibly happen does. Geto is left dumbstruck as Toji Fushiguro makes his appearance. Toji then declares that he killed Satoru Gojo.",
      "airDate": "2023-07-27",
      "stillPath": "/mPm5BPw4dujoEHZNjpYTUEBLBZz.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 29,
      "name": "Premature Death",
      "overview": "August 2007. Gojo starts to handle missions on his own, causing Geto to, as well. One day a certain individual appears before Geto. What's the conclusion that led to Gojo becoming the strongest jujutsu sorcerer, and Geto becoming the most evil curse user?",
      "airDate": "2023-08-03",
      "stillPath": "/gjWLlxTUqzf7t4HsMQhUCxke5EW.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 30,
      "name": "It's Like That",
      "overview": "2018. After finishing a mission one day, Itadori decides to go to the movies, Kugisaki decides to go shopping, and Fushiguro tells them he's going home. After parting ways Kugisaki is approached by a woman who suddenly asks if she was with Itadori-kun.",
      "airDate": "2023-08-31",
      "stillPath": "/5sVDG2UKlryQ3YhAMzSHKwXE0nF.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 31,
      "name": "Evening Festival",
      "overview": "The battle between Muta and Mahito continues and reaches its conclusion. Later, on October 31st, a veil is lowered over Shibuya and various jujutsu sorcerer teams assemble around the area.",
      "airDate": "2023-09-07",
      "stillPath": "/AwgGz4NcjZEv65DoCx4sOoZ2hdn.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 32,
      "name": "Shibuya Incident",
      "overview": "Team Mei Mei are reassigned to a veil that has been lowered over Meiji Shrine Station. The team splits up and Yuji encounters a grasshopper curse assigned to protecting the veil. Elsewhere Satoru Gojo encounters Jogo, Hanami, and Choso.",
      "airDate": "2023-09-15",
      "stillPath": "/iWpee6FUvkhvA2ZQuWxRkwIltjy.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 33,
      "name": "Shibuya Incident - Gate, Open",
      "overview": "The battle between Satoru Gojo, Jogo, Hanami and Choso begins. Gojo informs Hanami that they will die first. Yuji encounters a woman who tells him that everyone was turned into monsters and boarded a train. As Gojo's battle continues, the train arrives.",
      "airDate": "2023-09-22",
      "stillPath": "/wbeKG5lUim0kUzygMojZ5XLH7ar.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 34,
      "name": "Pandemonium",
      "overview": "Now that Satoru Gojo has been sealed, Mechamaru works with Team Mei Mei to inform them about what is going on and has them work on enacting his plan on what to do now.",
      "airDate": "2023-09-29",
      "stillPath": "/vVKd4JzK1UV6sxuiPL28gZdtT4Q.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 35,
      "name": "Seance",
      "overview": "Nanami, Fushiguro, and Ino meet up with Itadori, then Nanami issues new orders for the others to work together to lift the veil keeping sorcerers out.",
      "airDate": "2023-10-06",
      "stillPath": "/6CIaldfN1D3DyeqRELOaTgGlVLu.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 36,
      "name": "Dull Knife",
      "overview": "Yuji and Megumi lift the veil that was keeping sorcerers from entering Shibuya. Nobara and Nitta encounter Shigemo and a battle ensues. Shigemo has the upperhand, but then Nanami arrives with the deaths of the assistant supervisors in mind.",
      "airDate": "2023-10-12",
      "stillPath": "/kdpIM5MToGTQMwHCTpuMyabC7xu.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 37,
      "name": "Red Scale",
      "overview": "Yuji makes his way to Shibuya Station where he's confronted by Choso. Choso unleashes his Convergence and the battle between him and Yuji commences.",
      "airDate": "2023-10-19",
      "stillPath": "/iKXFjdV8tmrQmqro2AsJ2e1AwjN.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 38,
      "name": "Fluctuations",
      "overview": "Mei Mei and Ui Ui fight the Special-Grade Disease Curse summoned by whatever is pretending to be Suguru Geto. Meanwhile, Nanami joins up with Maki and Naobito, but they encounter a cursed spirit with unknown powers.",
      "airDate": "2023-10-26",
      "stillPath": "/uUIXH9nBl7HFoaomIlL4CTolq39.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 39,
      "name": "Fluctuations (2)",
      "overview": "Nanami, Maki, and Naobito are driven to the edge after the Special-Grade Cursed Spirit, Dagon, activates his Domain Expansion, Horizon of the Captivating Skandha. Fushiguro gives them a glimpse of a way to escape death, then Toji intrudes upon the fight.",
      "airDate": "2023-11-02",
      "stillPath": "/vzNGwCOfpuytEmR2UO29trlodjy.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 40,
      "name": "Thunderclap",
      "overview": "Sukuna refuses to heed Jogo's advice after waking up, instead displaying his overwhelming strength against the Special-Grade Cursed Spirit, Jogo. Meanwhile, Fushiguro faces off against the rampant Toji with neither being aware of the other's identity.",
      "airDate": "2023-11-09",
      "stillPath": "/g9yiVw2BHqThSeevyuKBoJrsTpM.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 41,
      "name": "Thunderclap (2)",
      "overview": "After being severely injured in his fight against Toji, Fushiguro suffers a surprise attack from Shigemo. On the verge of death, Fushiguro desperately heads toward Dougenzaka crossing and summons a certain Shikigami with his Ten Shadows Technique.",
      "airDate": "2023-11-16",
      "stillPath": "/sduM7W14ngIFUMnXaWfjb96lv0I.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 42,
      "name": "Right and Wrong",
      "overview": "Itadori reawakens with grievous resolve as he bears witness to the aftermath Sukuna has wrought upon Shibuya. Meanwhile, Nanami continues to fight through packs of transfigured humans in an exhausted haze until Mahito appears before him.",
      "airDate": "2023-11-23",
      "stillPath": "/rAZeDUOFLQoLgEqcjvNoMy7lmpB.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 43,
      "name": "Right and Wrong (2)",
      "overview": "Itadori launches into a back-and-forth battle against Mahito, but he struggles against Mahito's ploy of using average people against him. Meanwhile, Kugisaki encounters one of Mahito's separated bodies as she returns to the battlefield.",
      "airDate": "2023-11-30",
      "stillPath": "/irunrX4hAbsTWUTZpWNJXg1Asbv.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 44,
      "name": "Right and Wrong (3)",
      "overview": "Itadori stands in a daze at the disaster before his eyes, his mind already well past its limit. As a curse, Mahito is elated at seeing his ideal sequence of events play out before him, and he prepares to further finish off Itadori.",
      "airDate": "2023-12-07",
      "stillPath": "/vdpupuE0OtfInqCmwU9Wk4sMqC9.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 45,
      "name": "Metamorphosis",
      "overview": "After rescuing Itadori from his predicament, Todo bolsters his morale and encourages him to stand back up. As Mahito kicks things into higher gear, he begins using Soul Multiplicity and Body Repel to unleash omnidirectional attacks.",
      "airDate": "2023-12-14",
      "stillPath": "/pg4bblgq3ywpFOphH5tEerg7Tu8.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 46,
      "name": "Metamorphosis (2)",
      "overview": "The moment it appeared Itadori and Mahito's battle to the death was resolved, the being wearing Geto's body asked, \"Shall I save you, Mahito?\" Itadori immediately recognizes the man before him as the very same one who sealed away Gojo and leaps to attack.",
      "airDate": "2023-12-22",
      "stillPath": "/iJbmi5vBd2eAt1LtKmTe7z4EXjM.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 47,
      "name": "Shibuya Incident - Gate, Close",
      "overview": "Choso begins to realize the identity of the mastermind parasitizing Geto's corpse as sorcerers gather for the final moments of the Shibuya Incident. The special-grade sorcerer, Yuki Tsukumo, comes to the rescue when they're on the verge of death.",
      "airDate": "2023-12-28",
      "stillPath": "/oZXG2hKiueV4A9RSbV6ZMNdhWyz.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 48,
      "name": "Execution",
      "overview": "While Yuji grapples with the weight of his sins, Naoya Zen'in and Yuta Okkotsu set out to execute him.",
      "airDate": "2026-01-09",
      "stillPath": "/akmW3aKQHlgcRvgxKsZd5m1LGKl.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 49,
      "name": "One More Time",
      "overview": "After fighting Yuta, Yuji learns his real objective. Megumi asks for Yuji's help to save his sister.",
      "airDate": "2026-01-09",
      "stillPath": "/mVTNtGCnwuE1ayDQ4YellOGAqZ.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 50,
      "name": "About the Culling Game",
      "overview": "Itadori and his friends speak with Tengen about Kenjaku's objectives and their plans for the Culling Game.",
      "airDate": "2026-01-16",
      "stillPath": "/buHU8HMXtQIVirrrERclsvNhBkh.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 51,
      "name": "Perfect Preparation",
      "overview": "After going to collect their Cursed Tools, Maki awakens her true potential & slaughters the whole Zen'in Clan.",
      "airDate": "2026-01-23",
      "stillPath": "/kGNQcoL2zigPdrlDkZ40rh9tH95.jpg",
      "runtime": 28
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 52,
      "name": "Passion",
      "overview": "Yaga is executed. Yuji and Fushiguro go to Hakari's fight club hoping to meet him and recruit him.",
      "airDate": "2026-01-30",
      "stillPath": "/iB7beiAcT76F49mIjY81en0CLcx.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 53,
      "name": "Cog",
      "overview": "Fushiguro and Panda fight Kirara to try and persuade them while Yuji attempts to convince Hakari.",
      "airDate": "2026-02-06",
      "stillPath": "/nhktJ4DxPVV8qMswwBg4GY9klZk.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 54,
      "name": "Tokyo Colony No. 1",
      "overview": "Yuji's group enters two of the colonies and fight the Culling Game's newbie hunters.",
      "airDate": "2026-02-13",
      "stillPath": "/5o3IoYM0iwz0Zy2AdU5tEf3h5Ic.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 55,
      "name": "Tokyo Colony No. 1 (2)",
      "overview": "Yuji meets Higuruma and tries to persuade him, while Fushiguro is falsely led to Reggie.",
      "airDate": "2026-02-27",
      "stillPath": "/dmvtvvYetrxgH217Qlgi5pgofzP.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 56,
      "name": "Tokyo Colony No. 1 (3)",
      "overview": "Yuji Itadori fights Hiromi Higuruma.",
      "airDate": "2026-03-06",
      "stillPath": "/vK5i4rioPM3JmX6LWu1SDBBf8fU.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 57,
      "name": "Tokyo Colony No. 1 (4)",
      "overview": "Takaba handles the minions while Fushiguro has his showdown with Reggie.",
      "airDate": "2026-03-13",
      "stillPath": "/dTxospdYJYATOY15svZiexTD6Uc.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 58,
      "name": "Tokyo Colony No. 1 (5)",
      "overview": "Fushiguro deploys his Domain Expansion in his climatic fight against Reggie.",
      "airDate": "2026-03-20",
      "stillPath": "/cDtoVcO4zDWj3UhJQq7nf41xSg.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 59,
      "name": "Sendai Colony",
      "overview": "Okkotsu fights three powerful sorcerers in Sendai Colony.",
      "airDate": "2026-03-27",
      "stillPath": "/osf38zTKIVDC5WGR9IKy8kk4Own.jpg",
      "runtime": 29
    }
  ],
  "57243:13": [
    {
      "seasonNumber": 13,
      "episodeNumber": 1,
      "name": "The Halloween Apocalypse",
      "overview": "On Halloween, all across the universe, terrifying forces are stirring. The life of Dan Lewis is about to change forever. Why is the Doctor chasing Karvanista? What is the Flux?",
      "airDate": "2021-10-31",
      "stillPath": "/9zdtqxzJrETPeHrJaRp5BhuultY.jpg",
      "runtime": 51
    },
    {
      "seasonNumber": 13,
      "episodeNumber": 2,
      "name": "War of the Sontarans",
      "overview": "In the Crimean War, the Doctor discovers the British army fighting a brutal alien army of Sontarans, as Yaz and Dan are thrown deeper into a battle for survival. What is the Temple of Atropos? Who are the Mouri?",
      "airDate": "2021-11-07",
      "stillPath": "/lZEmZo4iJqvHLKDxhORT9x9C33d.jpg",
      "runtime": 60
    },
    {
      "seasonNumber": 13,
      "episodeNumber": 3,
      "name": "Once, Upon Time",
      "overview": "'Time is beginning to run wild.' On a planet that shouldn’t exist, in the aftermath of apocalypse, the Doctor, Dan, Yaz and Vinder face a battle to survive.",
      "airDate": "2021-11-14",
      "stillPath": "/yTLrnRKrbRJooWr0kQB6ZE44uzD.jpg",
      "runtime": 50
    },
    {
      "seasonNumber": 13,
      "episodeNumber": 4,
      "name": "Village of the Angels",
      "overview": "Devon, November 1967. A little girl has gone missing, Professor Eustacius Jericho is conducting psychic experiments, and in the village graveyard, there is one gravestone too many. Why is Medderton known as the Cursed Village, and what do the Weeping Angels want?",
      "airDate": "2021-11-21",
      "stillPath": "/xBkFTHLnA0ZjHAfVLW8NTc2E0FW.jpg",
      "runtime": 57
    },
    {
      "seasonNumber": 13,
      "episodeNumber": 5,
      "name": "Survivors of the Flux",
      "overview": "As the forces of evil mass, the Doctor, Yaz and Dan face perilous journeys and seemingly insurmountable obstacles in their quest for survival.",
      "airDate": "2021-11-28",
      "stillPath": "/jcEyyiqsYMLA2VdiZanEGfg8oQC.jpg",
      "runtime": 51
    },
    {
      "seasonNumber": 13,
      "episodeNumber": 6,
      "name": "The Vanquishers",
      "overview": "In the final epic chapter in the story of the Flux, all hope is lost. The forces of darkness are in control. But when the monsters have won, who can you count upon to save the universe?",
      "airDate": "2021-12-05",
      "stillPath": "/20wu1cj5iZWyphnYQvKY1M9yBYQ.jpg",
      "runtime": 60
    }
  ],
  "94664:2": [
    {
      "seasonNumber": 2,
      "episodeNumber": 1,
      "name": "The Brokenhearted Mage",
      "overview": "Rudeus journeys to the harsh northlands in search of his lost mother. Or at least, that's what he tells himself. The scars of his parting from Eris run deep, and getting back on his feet may not be so easy.",
      "airDate": "2023-07-10",
      "stillPath": "/mcSxW3rCNUN9FJkPugzIgnNdGBE.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 2,
      "name": "The Forest in the Dead of Night",
      "overview": "Rudeus doesn't want a new party, but he still grows closer to Counter Arrow as he settles into life as a northlands adventurer. When danger rears its head, he finds himself risking it all for his new friends.",
      "airDate": "2023-07-17",
      "stillPath": "/tuP5fqtVZYA1UKW8n2hwgJtykYv.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 3,
      "name": "Abrupt Approach",
      "overview": "Things seem to be looking up for Rudeus. And when Sara asks him on a date, he decides to forget his heartbreak and start a new romance. But putting the past behind him may be easier said than done.",
      "airDate": "2023-07-24",
      "stillPath": "/cDBi2NEvg3RiEKj9SuWpWh7BSBy.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 4,
      "name": "Letter of Invitation",
      "overview": "After two years of adventuring with Soldat, Rudeus is no closer to finding his mother or curing his impotence. But the sudden arrival of a seductive elf and an unexpected offer could send his life off in a whole new direction.",
      "airDate": "2023-07-31",
      "stillPath": "/2kTiEzn1u7h2yxL14fYehYR7ATV.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 5,
      "name": "Ranoa University of Magic",
      "overview": "Following the Man-God's advice, Rudeus enrolls in school. He reunites with an old friend and meets potential new enemies, but will he find what he seeks? And what does the future hold for him and the enigmatic \"Silent Fitz\"?",
      "airDate": "2023-08-07",
      "stillPath": "/1TEiOCt9F60YHrf378nVkBrdmO.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 6,
      "name": "I Don't Want To Die",
      "overview": "Rudeus is settling into school life and growing better acquainted with the enigmatic Silent Fitz. But when his efforts to teach Zanoba hit a roadblock, his new friend proposes a drastic solution.",
      "airDate": "2023-08-14",
      "stillPath": "/7nKkKI1adnozFmJ1esGUzwt7Gl9.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 7,
      "name": "The Kidnapping and Confinement of Beast Girls",
      "overview": "When Rudeus discovers that two of his new schoolmates have destroyed one of his precious figures, he swears revenge. But while he may be able to trounce schoolgirls in a fight, figuring out what to do with them next won't be so easy.",
      "airDate": "2023-08-21",
      "stillPath": "/pCcMTFLHxTrUHt3OqMhc1WYvind.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 8,
      "name": "The Fiancé of Despair",
      "overview": "Love is in the air. First, a smitten classmate seeks Rudeus's help to meet the girl of his dreams. Then the beast people's mating season puts Rudeus in an awkward position—one he'll have to fight his way out of.",
      "airDate": "2023-08-28",
      "stillPath": "/eM2ZRMsDWuNRUjR2uVuqaLaRmB4.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 9,
      "name": "The White Mask",
      "overview": "Investigating the mass teleportation leads Rudeus to seek out his most elusive classmate: the brilliant Silent Sevenstar. But when he calls at Silent's laboratory tower, he finds a familiar face that he didn't expect—and doesn't welcome.",
      "airDate": "2023-09-04",
      "stillPath": "/59bGSEevD9shxXtUlnumDBYK8b1.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 10,
      "name": "These Feelings",
      "overview": "Rudeus settles into a new routine at the university. But as time passes, Silent Fitz is increasingly in his thoughts. What does he really feel for his enigmatic classmate? And how far will he pry into a friend's secrets to find out?",
      "airDate": "2023-09-11",
      "stillPath": "/wzigeQOp5KiMRZGEMiJrTiKPoLS.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 11,
      "name": "To You",
      "overview": "Ariel confronts Sylphiette with a choice: reveal herself to Rudeus or cut ties with him forever. Determined on one last push to jog Rudeus's memory, Sylphiette invites him on a forest expedition.",
      "airDate": "2023-09-18",
      "stillPath": "/uTL8idBcXNkWg1ZNUhDNACDRnn4.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 12,
      "name": "I Want to Tell You",
      "overview": "Sylphiette reveals herself and Rudeus admits his feelings, but even that isn't enough to cure what ails him. After their heart-to-heart, Sylphiette sets out to end his problem once and for all.",
      "airDate": "2023-09-25",
      "stillPath": "/pDxepnPctRVozi3uER4AZitz0Yv.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 13,
      "name": "My Dream Home",
      "overview": "Newly cured and brimming with confidence, Rudeus resolves to marry Sylphie. Just one problem: he has no idea how marriage works in this world. And when friends tell him any newlywed needs a house, he winds up with a haunted mansion.",
      "airDate": "2024-04-08",
      "stillPath": "/h9qYsLX59hJEoqwudjfpp4G7zsb.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 14,
      "name": "Wedding Reception",
      "overview": "The newlyweds have settled into their new home. Next, custom dictates they throw a party for everyone they know. Preparing to host a crowd won't be easy. And even if they pull it off, the big day has surprises in store.",
      "airDate": "2024-04-15",
      "stillPath": "/t9goEAxsd8LudOnzgHJHMwIFzJB.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 15,
      "name": "Afar",
      "overview": "Rudeus receives a letter from Paul. The letter explains that Norn and Aisha, Rudeus's younger sisters, have been sent to join Rudeus. Meanwhile Nanahoshi continues her research into summoning magic for a way to return to her original world.",
      "airDate": "2024-04-22",
      "stillPath": "/73G9pW6Hq6KSe32iYcSrwSllppN.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 16,
      "name": "Norn and Aisha",
      "overview": "Rudeus's sisters arrive with an unexpected chaperone. After catching up with an old friend, Rudeus decides it's time to send the girls to school. But convincing Norn and Aisha turns out to be more trouble than he bargained for.",
      "airDate": "2024-04-29",
      "stillPath": "/9YJCqvhLiRHHIfaR7PE1ou3ny3w.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 17,
      "name": "My Older Brother's Feelings",
      "overview": "Norn shuts herself in her dorm room and refuses to attend classes. Haunted by the specter of his past life, Rudeus sets out to solve his sister's problems, only to discover that he is the cause.",
      "airDate": "2024-05-06",
      "stillPath": "/5uqn76jSS3Zy3NPbPSvO6bLIR08.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 18,
      "name": "Turning Point 3",
      "overview": "Life is looking up for Rudeus. His sisters are settling in, and he has plenty of time for friends and family... until an announcement from Sylphie and an unexpected letter upend his idyllic school life.",
      "airDate": "2024-05-13",
      "stillPath": "/lBwC3cCgMuGJRxAX52tRJaWi6dd.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 19,
      "name": "Desert Journey",
      "overview": "With Nanahoshi's help, Rudeus gains a way to shorten his journey, but he and Elinalise will still need to hurry if they hope to return before Sylphie gives birth. Their first obstacle: the harsh desert of Begaritt and its monstrous denizens.",
      "airDate": "2024-05-27",
      "stillPath": "/xSi2t4SSx7XGrLdzy8Gp9GLJ1SD.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 20,
      "name": "Into the Labyrinth",
      "overview": "Rudeus and Elinalise reach Rapan and soon reunite with Paul, only to learn that a deadly labyrinth has claimed both Zenith and Roxy. The fruits of Rudeus's studies offer a last, faint hope to reach his mother and his mentor in time.",
      "airDate": "2024-06-03",
      "stillPath": "/6UmlIWL3pW28dMVmPJvI0cGm8uY.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 21,
      "name": "Magic Circle to the Sixth Stratum",
      "overview": "With Roxy's rescue, the search for Zenith resumes in earnest. Rudeus reconnects with his mentor amid the perils of the labyrinth. But why does she seem a little more awkward around him than before?",
      "airDate": "2024-06-10",
      "stillPath": "/2iZ0wOEnZ6DyvBWqdLPvPDFjU8q.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 22,
      "name": "Parents",
      "overview": "The rescue party reaches the heart of the Teleporter Labyrinth and confronts its guardian. But when the monster shrugs off Rudeus's magic, they realize they may have bitten off more than they can chew.",
      "airDate": "2024-06-17",
      "stillPath": "/oe5fQnzK6uixFvpmN0w0WAuc3Lk.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 23,
      "name": "Let's Go Home",
      "overview": "Roxy makes a desperate move to pull Rudeus out of his depression. As the group journeys home, both of them must face their feelings and negotiate the consequences.",
      "airDate": "2024-06-24",
      "stillPath": "/zsJlKRwGXI2dcgyMjiZqnQuO0gf.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 2,
      "episodeNumber": 24,
      "name": "Succession",
      "overview": "Rudeus arrives home, frantic that something may have gone wrong in his absence. But the conversations waiting for him may become disasters in their own right. How can he introduce a new wife to a family still reeling from Paul's death?",
      "airDate": "2024-07-01",
      "stillPath": "/34qxeVn9C6L15CnvovgP7smyNyq.jpg",
      "runtime": 24
    }
  ],
  "86031:3": [
    {
      "seasonNumber": 3,
      "episodeNumber": 1,
      "name": "NEW WORLD MAP",
      "overview": "While continuing to use the hot air balloon to search for the oil, it's decided that Ishigami Village needs to take up agriculture to prevent future food shortages, as well as to produce preserved food for their upcoming sea voyage.",
      "airDate": "2023-04-06",
      "stillPath": "/x3hrsz8A6WX1crKV5WLiMkvUuvo.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 2,
      "name": "Greed Equals Justice",
      "overview": "The Kingdom of Science will need rations to last them through their voyage to the other side of the world. But Senku, being no professional, burns all the bread he attempts to bake.",
      "airDate": "2023-04-13",
      "stillPath": "/o15nnT0jmjhMfxLPn00PgkSisR7.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 3,
      "name": "First Contact",
      "overview": "Senku, brings along a team to look for the Sagara Oil Fields. Meanwhile, Suika and Francois go truffle hunting.",
      "airDate": "2023-04-20",
      "stillPath": "/7uRDjro0Z42MHQFT5AyFaUxvY6M.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 4,
      "name": "Eyes of Science",
      "overview": "The morse code signal reading \"WHY\" saturates the airwaves too much for Ukyo to pinpoint a direction, so the Kingdom of Science works on a way to visualize the signal.",
      "airDate": "2023-04-27",
      "stillPath": "/aVA397LlFUhOTIrEt9k3F7OKk6M.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 5,
      "name": "Science Vessel Perseus",
      "overview": "Kaseki's efforts to build the science vessel Perseus hit a roadblock when he realizes that it's impossible to get all the parts to fit in practice.",
      "airDate": "2023-05-04",
      "stillPath": "/3IjMInLbkq1mygdPzWSmj6Mrdp8.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 6,
      "name": "TREASURE BOX",
      "overview": "The Perseus crew are on their way to the treasure island, the birthplace of the Hundred Tales, where they hope to locate the treasure box left behind by the Soyuz crew.",
      "airDate": "2023-05-11",
      "stillPath": "/v8hh3pmeXKH4MtPFajLqOQ3Hvqr.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 7,
      "name": "Ray of Despair, Ray of Hope",
      "overview": "The Perseus arrives at the treasure island. A recon squad consisting of Senku, Soyuz, Kohaku, and Gen set off to locate the platinum and make contact with the islanders. Ukyo later discovers something on the seafloor and send Ginro to investigate.",
      "airDate": "2023-05-18",
      "stillPath": "/4fgL5cLY8SqjUOyO3KC1ycPSBaB.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 8,
      "name": "The Trump Card Aboard the Science Vessel",
      "overview": "Amaryllis explains how she evaded petrification and how she came to her decision to sneak into the inner palace.",
      "airDate": "2023-05-25",
      "stillPath": "/n1yumf39DunOziTGMZWcCkgkS4b.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 9,
      "name": "Beautiful Science",
      "overview": "Suika and Ginro work together to rescue the mobile lab from the Perseus. Reunited with Senku and the others, the group works on items to help Kohaku with the selection process.",
      "airDate": "2023-06-01",
      "stillPath": "/7LhbWIVc3mJf0cjshNwpVWJDLAQ.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 10,
      "name": "SCIENCE WARS",
      "overview": "Amaryllis, Ginro and Kohaku are chosen to join the inner palace. The science team will need a way to communicate with them in secret, and, eventually, a way for them with the science team.",
      "airDate": "2023-06-08",
      "stillPath": "/7OeCecH8SqkaKXDV9aS9vyMyKQz.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 11,
      "name": "With This Fist, a Miracle",
      "overview": "Kohaku has located the treasure left behind by Byakuya and the others, but it's encased in concrete. Senku has to devise a plan to quietly get at the contents inside, so as to not alert the guards.",
      "airDate": "2023-06-15",
      "stillPath": "/b577K4Y15J2zop96edjtQRjeG5S.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 12,
      "name": "The Kingdom of Science's Counterattack",
      "overview": "Kohaku is forced to destroy Ryusui's statue to prove that she isn't a spy.",
      "airDate": "2023-10-12",
      "stillPath": "/wK4bbwqbPk1PbLljcazH6KzWVvx.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 13,
      "name": "The Medusa's True Face",
      "overview": "The team revives Kaseki to work on the drone. Meanwhile, Ginro is called to see the Master.",
      "airDate": "2023-10-19",
      "stillPath": "/gTfHFLH8RNvq2KirV7aPemhzXW8.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 14,
      "name": "Deal Game, Test of Wit",
      "overview": "More of the Kingdom of Science is brought back from petrification, but they are discovered in the cave by Moz.",
      "airDate": "2023-10-26",
      "stillPath": "/mHFWnsigkolhX6GyhV8Z4wb9rtp.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 15,
      "name": "Battle in Three Dimensions",
      "overview": "Moz and the Kingdom of Science form a tenuous, temporary alliance against Ibara. How long it will last is a question they can't afford to concern themselves with just yet.",
      "airDate": "2023-11-02",
      "stillPath": "/i5WrLPDOESOxntDuoJ1AqVgYR9I.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 16,
      "name": "Total War",
      "overview": "The Kingdom of Science attacks and tries to execute their plan to steal the petrification device. Moz convinces Kirisame to use the device, but Ryusui's instincts tell him something is off about the situation.",
      "airDate": "2023-11-09",
      "stillPath": "/uJGNLytepCwHWmUXl7MjPfOtZAa.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 17,
      "name": "JOKER",
      "overview": "The Kingdom of Science members launch an attack on the islanders aboard the Perseus, but Moz isn't far behind and Senku and the others are forced to retreat inside the vessel. Ibara has them cornered, but Senku unleashes his Joker card.",
      "airDate": "2023-11-16",
      "stillPath": "/6v7V8kljFknyT2NhVRsHK9tESC1.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 18,
      "name": "Flicker of Doom",
      "overview": "Yo and the Kingdom of Science capture the petrification device, but Ibara isn't going down without a fight.",
      "airDate": "2023-11-23",
      "stillPath": "/93wkryYnttiGIYLbBpfK1ZsRtWV.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 19,
      "name": "LAST MAN STANDING",
      "overview": "Much to Ibara's shock and dismay, Senku devised a plan and managed to escape petrification. Now the two enter into a head-to-head battle for control of the Medusa device.",
      "airDate": "2023-11-30",
      "stillPath": "/4PlCnfRS4V6Ij8RR7qLtK2akqKW.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 20,
      "name": "FIRST DREAM",
      "overview": "Senku stands victorious. He then works on reviving the others and fixing their communications device, but while they are talking with Ruri they encounter a strong interference with the signal.",
      "airDate": "2023-12-07",
      "stillPath": "/8nhV9hoZ1k6qcUVHMZ5MV8jc0TJ.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 21,
      "name": "Treasure Island",
      "overview": "To the moon! That's the plan, at least. Senku and the Kingdom of Science need to devise a means with which to go to the moon and deal with Why-Man. The first step is allying with the people of Treasure Island and enlisting their help with some new crafts.",
      "airDate": "2023-12-14",
      "stillPath": "/r2YtNnc9wgcbC6pZTrFhi5LBHpm.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 3,
      "episodeNumber": 22,
      "name": "BEYOND THE NEW WORLD",
      "overview": "With the petrification device in the Kingdom's hands, it's time to revive Tsukasa. But there's just one problem: the device is out of batteries.",
      "airDate": "2023-12-21",
      "stillPath": "/2GB1NNoz7KsQC6yaMOpQs8xvVZO.jpg",
      "runtime": 24
    }
  ],
  "85937:1": [
    {
      "seasonNumber": 1,
      "episodeNumber": 1,
      "name": "Cruelty",
      "overview": "It is the Taisho Period (i.e. 1912-1926). Tanjiro Kamado is living a modest but blissful life in the mountains with his family. One day, when he returns from selling charcoal in town, he finds the remains of his slaughtered family in pools of blood after a demon attack. Tanjiro rushes down the snowy mountain with the sole survivor, his sister Nezuko, on his back. But on the way, Nezuko suddenly snarls, turning on Tanjiro.",
      "airDate": "2019-04-06",
      "stillPath": "/l2C38X6RsbD5gom4iGvFe6yuPEy.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 2,
      "name": "Trainer Sakonji Urokodaki",
      "overview": "At Giyu Tomioka's urging, Tanjiro heads for Mt. Sagiri with his sister Nezuko who's been turned into a demon. During the night, Tanjiro catches the smell of blood from inside a temple. He enters, thinking that someone might be hurt, only to come upon a man-eating demon. When the demon attacks, Tanjiro manages to fight back with his hatchet, but the demon's strength is overwhelming. Just as the demon is about to finish him off, Tanjiro is saved by none other than.",
      "airDate": "2019-04-13",
      "stillPath": "/r2MZH3snLABIpqUPj8YOF9HIaBf.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 3,
      "name": "Sabito and Makomo",
      "overview": "The Demon Slayer Corps... An organization that's been hunting down demons since ancient times. Sakonji Urokodaki starts training Tanjiro for Final Selection, the test for joining the unit. Navigating a mountain riddled with booby traps, dry sword swings, waterfall immersion and breathing techniques... A year later, Urokodaki informs Tanjiro that he has nothing more to teach him, and gives him one last hurdle to overcome in front of a giant boulder.",
      "airDate": "2019-04-20",
      "stillPath": "/m9sWQLtoU1G5jdHOYUnykin0xxw.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 4,
      "name": "Final Selection",
      "overview": "To pass Final Selection, one must survive for seven days on Mt. Fujikasane where demons captured by the Demon Slayers have been imprisoned. So begins the battle for survival between the young swordsmen and the demons. Armed with the breathing techniques and stances he'd learned from Sakonji Urokodaki, Tanjiro slashes demon after demon. His two years of training have not gone to waste. But just then, a morphed demon appears out of nowhere.",
      "airDate": "2019-04-27",
      "stillPath": "/kH6Ir9EWGoqkTMoiQnx5fJmwY2I.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 5,
      "name": "My Own Steel",
      "overview": "When day breaks, there are only four swordsmen left standing after the seven-day battle. The guides who greet Tanjiro and the other survivors explain the Demon Slayer Corps system. All four are issued uniforms and Kasugai Crows as messengers, after which they must select the ore for their own Nichirin swords. After gazing hard at each lump of ore, and using his keen sense of smell, the one Tanjiro chooses is...",
      "airDate": "2019-05-04",
      "stillPath": "/fWsUsEVYaOHh6bPkgH7HeQxotmP.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 6,
      "name": "Swordsman Accompanying a Demon",
      "overview": "Tanjiro is now clad in the uniform of the Demon Slayer Corps. His Nichirin Sword on his hip, and Nezuko, now awake, in a special box made by Urokodaki on his back, he heads out for his first assignment. A town to the northwest where girls have been vanishing nightly. There, Tanjiro meets Kazumi, haggard with worry after his girlfriend's been abducted. Though he does catch the scent of a demon nearby, there's just no demon in sight. Tanjiro is sure that a demon is behind this sinister incident...",
      "airDate": "2019-05-11",
      "stillPath": "/4GeXmmkzRBduK2KXMGMrLlKYg44.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 7,
      "name": "Muzan Kibutsuji",
      "overview": "Now split into three, the demons have driven Tanjiro into a corner. It is then that Nezuko attacks. Now that she’s become a demon herself, she’s no longer so weak that she needs protection. His mind made up, Tanjiro follows one of the demons into the swamp now spreading across the ground. Waiting for him there is...",
      "airDate": "2019-05-18",
      "stillPath": "/aR1bB3ltg1FjGc6N3xBpiYz7Huo.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 8,
      "name": "The Smell of Enchanting Blood",
      "overview": "The next mission is in Asakusa, Tokyo. Tanjiro is taken aback by the opulent Taisho Era cityscape, but soon picks up the demon’s scent there. His pursuit of the scent leads him to Muzan Kibutsuji. Tanjiro attempts to strike him down. But Kibutsuji transforms a passerby into demon, triggering a commotion. As Tanjiro desperately tries to get things under control, someone appears before him...",
      "airDate": "2019-05-25",
      "stillPath": "/hnvD3jFov03BLjvGrqTueXZfvwL.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 9,
      "name": "Temari Demon and Arrow Demon",
      "overview": "It was two demons named Tamayo and Yushiro who came to Tanjiro’s rescue. Using the “Eyeblind” spell, Tamayo guides Tanjiro and Nezuko to her house. There, through his conversation with Tamayo, Tanjiro learns that there is a way to return demons to human form. Just then, two demons in pursuit of Tanjiro locate the house and unleash a furious assault...",
      "airDate": "2019-06-01",
      "stillPath": "/pMST9IQizKO4EE6P54yFFMBz7vE.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 10,
      "name": "Together Forever",
      "overview": "Tanjiro’s crisis continues. He uses multiple forms of the Water Breathing technique to hold out against Yahaba’s final Blood Demon Art, the \"Kouketsu Arrow.\" Meanwhile, Nezuko and Susamaru are still battling it out. Worried about the outcome, Tamayo unleashes her own Blood Demon Art.",
      "airDate": "2019-06-08",
      "stillPath": "/nDbVix8vunXKj6zLcVEaxwF7YTq.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 11,
      "name": "Tsuzumi Mansion",
      "overview": "Tanjiro's next destination, according to his Kasugai Crow, is to the south-southeast. On the way, Tanjiro runs into his fellow Final Selection survivor, the swordsman Zenitsu Agatsuma. Tanjiro has a hard time dealing with Zenitsu's passive attitude as they head deep into the mountains. They encounter two children whose older brother was taken away right in front of their house. There, Zenitsu hears the sound of a tsuzumi ringing out from somewhere.",
      "airDate": "2019-06-15",
      "stillPath": "/xKOewshyBZcisLUWrOQjEGe650L.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 12,
      "name": "The Boar Bares Its Fangs, Zenitsu Sleeps",
      "overview": "Inside the house, where the rooms spin each time the tsuzumi is played, Tanjiro gets separated from Zenitsu Agatsuma. Without Tanjiro by his side, Zenitsu is overcome by fear and despair as he takes Shoichi through the house. Meanwhile, Tanjiro meets the master of the house, the tsuzumi-playing demon, and an odd-looking man wearing a boar’s head mask.",
      "airDate": "2019-06-22",
      "stillPath": "/qrPsA5eNGH4sPwMImUhOvlShd7U.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 13,
      "name": "Something More Important Than Life",
      "overview": "Every time Kyogai, the master of house, plays his tsuzumi, the room spins and Tanjiro struggles. Debilitated by the fractured bones he sustained in his previous battle, Tanjiro tries to fire himself up as he desperately fights on, but he is overwhelmed by Kyogai's Blood Demon Art. Will he find a way to slice off Kyogai's head?",
      "airDate": "2019-06-29",
      "stillPath": "/5ixd8rC1tTDHf5kSo5o7hbghpOi.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 14,
      "name": "The House With the Wisteria Family Crest",
      "overview": "After a desperate fight to the death, Tanjiro prevails over Kyogai. He exits the house to find Zenitsu who had escaped earlier. But it is then that he sees the strange circumstances before him... The battered Zenitsu holding the box containing Nezuko in his arms while the man in the boar's head mask stands in the way with two Nichirin Swords drawn.",
      "airDate": "2019-07-06",
      "stillPath": "/AgDZ0yW2Me7pB7ZLVb4ynbBxRZp.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 15,
      "name": "Mount Natagumo",
      "overview": "Their next destination is to the north-northwest. Tanjiro and Nezuko head towards Mount Natagumo with Zenitsu and Inosuke. This mountain is covered with spider webs and is swarming with innumerable spiders. Leaving the cowering Zenitsu behind, Tanjiro and Inosuke head up the mountain where they run into fellow Demon Slayers entangled in spider webs.",
      "airDate": "2019-07-13",
      "stillPath": "/8CNCZfubtFYzvuo4GgIDCSXBYvj.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 16,
      "name": "Letting Someone Else Go First",
      "overview": "Tanjiro and Inosuke battle the Demon Slayers trapped by spider webs. After slashing the threads and destroying the webs, they head deeper into the mountain. The farther they advance through the forest, the thicker the threads become, and those under their control start moving in ways impossible for a human being. Stopping the Demon Slayers without hurting them isn't going to be easy, but then Tanjiro makes a certain move...",
      "airDate": "2019-07-20",
      "stillPath": "/5onw1Gg17048SoUZIuoT7FsO90a.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 17,
      "name": "You Must Master a Single Thing",
      "overview": "One of the Twelve Kizuki, a direct subordinate of Muzan Kibutsuji, is here somewhere. When Tanjiro slays the Mother Spider Demon of Mt. Natagumo, he learns that a demon who might hold the key to turning Nezuko back into a human is somewhere in this very forest. With the battered Inosuke in tow, he heads deeper into the forest. Meanwhile, Zenitsu trudges forlornly through the woods only to encounter a spider with a human face.",
      "airDate": "2019-07-27",
      "stillPath": "/oKOrMhozP1BX6gWiJAcuZVSm6Zd.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 18,
      "name": "A Forged Bond",
      "overview": "Tanjiro and Inosuke face off against the Father Spider Demon of Mt. Natagumo. Tanjiro unleashes an attack, only to get hurled away by the demon's overwhelming power. Landing near a river, he comes upon the young demon Rui torturing the Sister Spider Demon. When Rui calls their bond of terror and hatred \"a family’s bond,\" Tanjiro is enraged. So begins the battle between Rui and Tanjiro.",
      "airDate": "2019-08-03",
      "stillPath": "/ra7dCRS9E39fnhHieFKF47ldESl.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 19,
      "name": "Hinokami",
      "overview": "Swordsmen in the Demon Slayer Corps known as Hashiras have arrived on Mt. Natagumo. Giyu Tomioka, the Water Hashira, slays the Father Spider Demon with a single strike. Inosuke, thrilled to see such a display of swordsmanship by someone in a totally different league from himself, challenges Giyu to a duel. Meanwhile, Zenitsu lies near death as the poison circulates throughout his body. Just then, the Insect Hashira, Shinobu Kocho appears before him.",
      "airDate": "2019-08-10",
      "stillPath": "/b4o8DMgM61MJymZMFyR2nRnOifl.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 20,
      "name": "Pretend Family",
      "overview": "When Rui assaults him with his Blood Demon Art, Tanjiro braces himself for certain death. As his life flashes before his eyes, he suddenly remembers his father's dance, the kagura, and unleashes a new, non-Water Breathing attack. Hinokami Kagura Dance. Knowing that he’ll be receiving a simultaneous blow from the demon, he uses his new move to slice off Rui’s head. As Tanjiro crawls towards Nezuko, who lies on the ground, riddled with wounds, someone appears before him.",
      "airDate": "2019-08-17",
      "stillPath": "/jfdqvWLwsYiFcpR4mGlk2lzIT8g.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 21,
      "name": "Against Corps Rules",
      "overview": "Seeing Tanjiro try to protect Nezuko even as he collapses triggers memories of Rui’s own past. Once a sickly boy, he became a demon after meeting Muzan Kibutsuji who gave him a share of his blood. But after he turns into a demon, his own parents try to kill him. Ever since then, he has been searching for a family. Seeking a bond that he can never hope to acquire...",
      "airDate": "2019-08-24",
      "stillPath": "/2EX3WZVmtELyqdcDtGLf5KJjZ6.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 22,
      "name": "Master of the Mansion",
      "overview": "After the battle is over, Tanjiro and Nezuko are taken to the Demon Slayer Corps headquarters. This is where the Hashira Meeting between the Corps leader, Ubuyashiki, and the Hashiras, the most powerful swordsmen in the Corps, is to be held. The Hashiras censure Tanjiro for violating the Demon Slayer Corps by protecting a demon. And then, the Wind Hashira, Sanemi Shinazugawa, raises his sword against Nezuko...",
      "airDate": "2019-08-31",
      "stillPath": "/2bo6M1fLHXz47b3NoW3Y5zesTKB.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 23,
      "name": "Hashira Meeting",
      "overview": "Ubuyashiki, the leader of the Demon Slayer Corps, finally appears before Tanjiro. He tells him that he will allow Tanjiro and Nezuko to join the Corps. But the Hashiras are unable to accept this decision right away. The Wind Hashira, Sanemi Shinazugawa, slashes his own arm and taunts Nezuko with his blood, trying to get her to show her true colors as a demon.",
      "airDate": "2019-09-07",
      "stillPath": "/gdlEXQbUuVtIzKxuOMWd2BhT4n8.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 24,
      "name": "Rehabilitation Training",
      "overview": "The injured Tanjiro, Zenitsu and Inosuke are sent to the home of the Insect Hashira, Shinobu Kocho, for treatment. Two weeks later, Tanjiro and Inosuke start rehabilitation training. But the drills are brutal, and they find themselves broken in spirit. Unaware of the grueling regimen, Zenitsu joins them late and is visibly enthusiastic in front of girls, but...",
      "airDate": "2019-09-14",
      "stillPath": "/hhZsnP34Tjx568RJwSTN9nkkCcX.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 25,
      "name": "Tsuguko, Kanao Tsuyuri",
      "overview": "Tanjiro, who's undergoing rehabilitation training at the Butterfly Mansion, works hard to keep up his Total Concentration Breathing techniques all day long. Though at first, he's helpless against Kanao, a swordswoman in his class who's training him, he slowly but surely begins to make some headway. Seeing Tanjiro devote himself to training every single day, Zenitsu and Inosuke resume training as well, but...",
      "airDate": "2019-09-21",
      "stillPath": "/4VmgnTSJvOPbfy7k51t94T4q88e.jpg",
      "runtime": 23
    },
    {
      "seasonNumber": 1,
      "episodeNumber": 26,
      "name": "New Mission",
      "overview": "As Tanjiro and the others are devoted to their rehabilitation training, the absolute master of the demons, Muzan Kibutsuji, gathers the Lower Ranks of the Twelve Kizuki. The demons, too, are preparing to make their next move. As training draws to a close, Tanjiro has improved to the point where he can fight on equal terms with Kanao. Just then, he receives word of a new mission from his Kasugai Crow.",
      "airDate": "2019-09-28",
      "stillPath": "/oa3rVcE4H6PkbwJ8IWbDZ4EMHP0.jpg",
      "runtime": 23
    }
  ],
  "1429:4": [
    {
      "seasonNumber": 4,
      "episodeNumber": 1,
      "name": "The Other Side of the Sea",
      "overview": "As Marley battles the Mid-East Alliance to end a four-year war, a group of Warrior candidates on the front lines compete to be the successor of the Armored Titan.",
      "airDate": "2020-12-07",
      "stillPath": "/eqRF1ZQSzx31iLkyeJa95hMnWSr.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 2,
      "name": "Midnight Train",
      "overview": "Though glad the war is over, both the Eldian Warriors and Marley brass realize that neither have a future unless they finish the job of retaking the Founding Titan.",
      "airDate": "2020-12-14",
      "stillPath": "/oWqPmJGtbLpOlxLmlU5wSkaxBij.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 3,
      "name": "The Door of Hope",
      "overview": "Reiner reflects on his past, remembering what pushed him to become a Warrior and keep moving forward when all hope was lost.",
      "airDate": "2020-12-21",
      "stillPath": "/qy5HFULnm26qfIWOV98WOtJQTnD.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 4,
      "name": "From One Hand to Another",
      "overview": "A sudden visit from the Tybur family shakes up the Marleyan military. Meanwhile, Falco smuggles letters for a friend and helps two old comrades reunite.",
      "airDate": "2020-12-28",
      "stillPath": "/9S4W9H69wM3YQv6ebH9iSFVqrmF.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 5,
      "name": "Declaration of War",
      "overview": "While Willy Tybur reveals the truth in a shocking speech to the world, tensions rise behind the stage as Eren and Reiner meet face to face.",
      "airDate": "2021-01-11",
      "stillPath": "/8wAQqWibI7FUpEWeDqrgZtbJvWf.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 6,
      "name": "The War Hammer Titan",
      "overview": "Eren's rampage is thwarted by the War Hammer Titan whose tenacity leaves him stumped. With Marley's military joining the fight, he'll be hard-pressed to survive on his own.",
      "airDate": "2021-01-18",
      "stillPath": "/fYwa43vhmIEhTrrrNUJ13LA8YsG.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 7,
      "name": "Assault",
      "overview": "The forces of Paradis begin their assault, but the Warriors stand their ground. As Marley troops close in around them, Eren struggles to break the War Hammer's defenses.",
      "airDate": "2021-01-25",
      "stillPath": "/4fYKNPg6npvAr8S3gVs6NDmiz9Z.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 8,
      "name": "Assassin's Bullet",
      "overview": "With no Titans left to threaten their escape, the Scouts retreat on the airship. Determined to make them pay for trampling on her home, Gabi chases after with gun in hand.",
      "airDate": "2021-02-01",
      "stillPath": "/2vpDtLZnQLSiwBko8xbAMDTqvDX.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 9,
      "name": "Brave Volunteers",
      "overview": "As Paradis deals with the aftermath of the raid on Liberio, Armin looks back in the past to meeting the volunteer soldiers who reshaped their world.",
      "airDate": "2021-02-08",
      "stillPath": "/aq8oMwYb3zewlbeb1uh53pf6IOy.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 10,
      "name": "A Sound Argument",
      "overview": "Two years ago, Paradis welcomed their first visitor who was surprised to see one of their own. Obtaining their help will be critical in a three-part plan to protect Paradis.",
      "airDate": "2021-02-15",
      "stillPath": "/so6rHSKqbB4epZ8gH2fchb3J4hP.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 11,
      "name": "Deceiver",
      "overview": "Trapped on the world's most dangerous island, Falco and Gabi will do anything to survive. Elsewhere, the public demands answers when they learn the savior of Paradis has been detained.",
      "airDate": "2021-02-22",
      "stillPath": "/a0IoWgOTP9l1b5ToMGdKPPGK0WC.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 12,
      "name": "Guides",
      "overview": "While Hange and Pixis piece together Zeke's true intentions, tension builds outside HQ where Armin and Mikasa plead for permission to speak with Eren.",
      "airDate": "2021-03-01",
      "stillPath": "/pV4KZvQUFtXxCUuHpLZSeOUENi6.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 13,
      "name": "Children of the Forest",
      "overview": "Gabi and Falco seek out a fellow Marleyan who's surprised to see Warrior candidates. The truth of what happened at Ragako may shed some light on Zeke's secret plans.",
      "airDate": "2021-03-08",
      "stillPath": "/AuJfvRvUQvXU38t4YdYhL2FHt55.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 14,
      "name": "Savagery",
      "overview": "Armin and Mikasa speak with Eren, but are astounded by what he says. In the forest, Levi considers feeding the Beast Titan to someone new, but Zeke has other plans in mind.",
      "airDate": "2021-03-22",
      "stillPath": "/fcF46uEXO9VQtNgJkFSfOg27dU0.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 15,
      "name": "Sole Salvation",
      "overview": "A look into Zeke's past shows his struggle to become a Warrior. His plans to end the suffering of all Eldians stems from a chance friendship made in his youth.",
      "airDate": "2021-03-22",
      "stillPath": "/4NKaIWiO8y5M33cKIOe70qxjpKV.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 16,
      "name": "Above and Below",
      "overview": "With the Yeagerists now in charge, Zeke's master plan is revealed. But before it is put in motion, Eren recruits help to flush out any invaders in their midst.",
      "airDate": "2021-03-29",
      "stillPath": "/aWpoliRX1m1kR4uFqtgneMcBrNf.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 17,
      "name": "Judgment",
      "overview": "Caught off guard by Marley's surprise attack, Eren fends off their Titans alone. As the battle rages on above, the Scouts consider Eren's motives from the underground dungeons.",
      "airDate": "2022-01-10",
      "stillPath": "/cQp51TGhvY4rBv1DOjXAUhlF32Y.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 18,
      "name": "Sneak Attack",
      "overview": "The Beast Titan joins the fray, but General Magath is determined to take him down. Meanwhile, with the city in flames, Colt and Gabi rush to rescue Falco who's held captive by the Yeagerists.",
      "airDate": "2022-01-17",
      "stillPath": "/jaC9B14RbTOZskWjRX9nCpgcRg.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 19,
      "name": "Two Brothers",
      "overview": "Colt pleads with Zeke to not use his scream and turn Falco into a Titan. All the while, soldiers and Titans clash in battle as Eren struggles to make contact with his brother.",
      "airDate": "2022-01-24",
      "stillPath": "/xljKlZf3RIrRsrhaxdCBjvO1uFn.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 20,
      "name": "Memories of the Future",
      "overview": "Zeke takes Eren through Grisha's memories to show him how he's been brainwashed. But in doing so, Zeke discovers something about Eren that he never knew.",
      "airDate": "2022-01-31",
      "stillPath": "/9NEZISr8VKpRVDqcC1i8cOpxsJf.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 21,
      "name": "From You, 2,000 Years Ago",
      "overview": "For 2,000 years, the Founder Ymir has been waiting--a slave to those with royal blood. However, Eren's yearning for freedom gives her a choice that could shake things up.",
      "airDate": "2022-02-07",
      "stillPath": "/vRXC0k8wsCFRwmgWwVu7KDcGKRT.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 22,
      "name": "Thaw",
      "overview": "With no walls left on the island and Shiganshina full of Titans, the Scouts must battle their former comrades. In the midst of it all, Gabi is determined to find and rescue Falco at whatever cost.",
      "airDate": "2022-02-14",
      "stillPath": "/1b1TEZCiJqJ6c1Wcx9YQUdj37Aj.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 23,
      "name": "Sunset",
      "overview": "The rumbling is set in motion once all hardening is undone, but this also sets Annie free. As the Jaegerists take control of the island, Conny races towards Ragako to feed Falco to his Titan mother.",
      "airDate": "2022-02-21",
      "stillPath": "/v3W1R7NSLQKiVf5Nmi6rFxFD7j4.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 24,
      "name": "Pride",
      "overview": "Upon reaching Ragako, Conny hatches a plan to trick Falco into being eaten by his mother. Elsewhere, hero of the Eldian Empire, Jean, is to execute Yelena and Onyankopon for their crimes against humanity.",
      "airDate": "2022-02-27",
      "stillPath": "/atKHPrLW5RRG1dUrahRrTXjJVAr.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 25,
      "name": "Night of the End",
      "overview": "Deep in the forest, an unlikely rabble of Marley stragglers and island fugitives attempt to set their hatred aside and talk around a campfire without killing each other.",
      "airDate": "2022-03-07",
      "stillPath": "/2XNOaOXY073RsdSh6mhLjd8pF1V.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 26,
      "name": "Traitor",
      "overview": "The Azumabito's flying boat is guarded by a port full of Jaegerists, but the Scouts are reluctant to kill their former friends. If they wish to avoid bloodshed, they can't afford their plan to go wrong.",
      "airDate": "2022-03-14",
      "stillPath": "/xUcJ93Tt5RHjdFPeXBKDEH3J7U1.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 27,
      "name": "Retrospective",
      "overview": "For the flying boat to take off, the mechanics need half a day to service it. Knowing they'll never last that long with Jaegerist reinforcements on the way, the crew is forced to change their plans.",
      "airDate": "2022-03-21",
      "stillPath": "/z1ymXAlYjYeTfsFvOAveVdSBeqQ.jpg",
      "runtime": 24
    },
    {
      "seasonNumber": 4,
      "episodeNumber": 28,
      "name": "The Dawn of Humanity",
      "overview": "Regardless of where it all began, Eren commits to his path of destruction during the Scouts' first visit to the Marleyan mainland, leaving Mikasa to wonder if things could've been different.",
      "airDate": "2022-04-04",
      "stillPath": "/9IT29LxBTDd610r2XzzGZXeca0b.jpg",
      "runtime": 23
    }
  ]
};

export const DEMO_MOVIES: TrackedMovie[] = [
  {
    "id": "demo-movie-1",
    "userId": "demo-user",
    "tmdbMovieId": 8392,
    "imdbId": "tt0096283",
    "title": "My Neighbor Totoro",
    "posterPath": "/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg",
    "releaseDate": "1988-04-16",
    "watchedAt": "2019-09-09T11:37:45Z",
    "addedAt": "2019-09-09T11:37:45Z"
  },
  {
    "id": "demo-movie-2",
    "userId": "demo-user",
    "tmdbMovieId": 329,
    "imdbId": "tt0107290",
    "title": "Jurassic Park",
    "posterPath": "/63viWuPfYQjRYLSZSZNq7dglJP5.jpg",
    "releaseDate": "1993-06-11",
    "watchedAt": "2019-09-07T17:17:46Z",
    "addedAt": "2019-09-07T17:17:46Z"
  },
  {
    "id": "demo-movie-3",
    "userId": "demo-user",
    "tmdbMovieId": 13,
    "imdbId": "tt0109830",
    "title": "Forrest Gump",
    "posterPath": "/Cw4hIUIAmSYfK9QfaUW5igp9La.jpg",
    "releaseDate": "1994-06-23",
    "watchedAt": "2019-09-07T17:29:11Z",
    "addedAt": "2019-09-07T17:29:11Z"
  },
  {
    "id": "demo-movie-4",
    "userId": "demo-user",
    "tmdbMovieId": 18,
    "imdbId": "tt0119116",
    "title": "The Fifth Element",
    "posterPath": "/fPtlCO1yQtnoLHOwKtWz7db6RGU.jpg",
    "releaseDate": "1997-05-02",
    "watchedAt": "2019-09-07T17:14:41Z",
    "addedAt": "2019-09-07T17:14:41Z"
  },
  {
    "id": "demo-movie-5",
    "userId": "demo-user",
    "tmdbMovieId": 120467,
    "imdbId": "tt2278388",
    "title": "The Grand Budapest Hotel",
    "posterPath": "/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    "releaseDate": "2014-02-26",
    "watchedAt": "2019-09-07T17:24:32Z",
    "addedAt": "2019-09-07T17:24:32Z"
  },
  {
    "id": "demo-movie-6",
    "userId": "demo-user",
    "tmdbMovieId": 333339,
    "imdbId": "tt1677720",
    "title": "Ready Player One",
    "posterPath": "/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg",
    "releaseDate": "2018-03-28",
    "watchedAt": "2022-03-17T19:19:03Z",
    "addedAt": "2022-03-17T19:19:03Z"
  },
  {
    "id": "demo-movie-7",
    "userId": "demo-user",
    "tmdbMovieId": 429617,
    "imdbId": "tt6320628",
    "title": "Spider-Man: Far From Home",
    "posterPath": "/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg",
    "releaseDate": "2019-06-28",
    "watchedAt": "2022-03-13T23:04:36Z",
    "addedAt": "2022-03-13T23:04:36Z"
  },
  {
    "id": "demo-movie-8",
    "userId": "demo-user",
    "tmdbMovieId": 10193,
    "imdbId": "tt0435761",
    "title": "Toy Story 3",
    "posterPath": "/AbbXspMOwdvwWZgVN0nabZq03Ec.jpg",
    "releaseDate": "2010-06-16",
    "watchedAt": "2019-09-07T17:19:04Z",
    "addedAt": "2019-09-07T17:19:04Z"
  },
  {
    "id": "demo-movie-9",
    "userId": "demo-user",
    "tmdbMovieId": 284053,
    "imdbId": "tt3501632",
    "title": "Thor: Ragnarok",
    "posterPath": "/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
    "releaseDate": "2017-10-02",
    "watchedAt": null,
    "addedAt": "2026-07-20T18:00:00.000Z"
  },
  {
    "id": "demo-movie-10",
    "userId": "demo-user",
    "tmdbMovieId": 351286,
    "imdbId": "tt4881806",
    "title": "Jurassic World: Fallen Kingdom",
    "posterPath": "/x2Us3jR6ToMJjbcPbLimYoxf6xr.jpg",
    "releaseDate": "2018-06-06",
    "watchedAt": null,
    "addedAt": "2026-07-20T18:00:00.000Z"
  },
  {
    "id": "demo-movie-11",
    "userId": "demo-user",
    "tmdbMovieId": 121856,
    "imdbId": "tt2094766",
    "title": "Assassin's Creed",
    "posterPath": "/kDXewoEcvbn0pUvJ8W3vfkuWgHw.jpg",
    "releaseDate": "2016-12-21",
    "watchedAt": null,
    "addedAt": "2026-07-20T18:00:00.000Z"
  },
  {
    "id": "demo-movie-12",
    "userId": "demo-user",
    "tmdbMovieId": 260513,
    "imdbId": "tt3606756",
    "title": "Incredibles 2",
    "posterPath": "/9lFKBtaVIhP7E2Pk0IY1CwTKTMZ.jpg",
    "releaseDate": "2018-06-14",
    "watchedAt": null,
    "addedAt": "2026-07-20T18:00:00.000Z"
  }
];

export const DEMO_SEARCH: CatalogSearchResult[] = [
  {
    "tmdbId": 37854,
    "type": "show",
    "name": "One Piece",
    "posterPath": "/dB4EDhre2dsC2kxYDavyKWqLQwi.jpg",
    "year": "1999",
    "overview": "Years ago, the fearsome Pirate King, Gol D. Roger was executed leaving a huge pile of treasure and the famous \"One Piece\" behind. Whoever claims the \"One Piece\" will be named the new King of the Pirates.\n\nMonkey D. Luffy, a boy who consumed a \"Devil Fruit,\" decides to follow in the footsteps of his idol, the pirate Shanks, and find the One Piece. It helps, of course, that his body has the properties of rubber and that he's surrounded by a bevy of skilled fighters and thieves to help him along the way.\n\nLuffy will do anything to get the One Piece and become King of the Pirates!"
  },
  {
    "tmdbId": 95479,
    "type": "show",
    "name": "JUJUTSU KAISEN",
    "posterPath": "/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg",
    "year": "2020",
    "overview": "Yuji Itadori is a boy with tremendous physical strength, though he lives a completely ordinary high school life. One day, to save a classmate who has been attacked by curses, he eats the finger of Ryomen Sukuna, taking the curse into his own soul. From then on, he shares one body with Ryomen Sukuna. Guided by the most powerful of sorcerers, Satoru Gojo, Itadori is admitted to Tokyo Jujutsu High School, an organization that fights the curses... and thus begins the heroic tale of a boy who became a curse to exorcise a curse, a life from which he could never turn back."
  },
  {
    "tmdbId": 57243,
    "type": "show",
    "name": "Doctor Who",
    "posterPath": "/m6G92osOtSeXwjSfL21jZCUOvxe.jpg",
    "year": "2005",
    "overview": "The Doctor is a Time Lord: a 900 year old alien with 2 hearts, part of a gifted civilization who mastered time travel. The Doctor saves planets for a living—more of a hobby actually, and the Doctor's very, very good at it."
  },
  {
    "tmdbId": 94664,
    "type": "show",
    "name": "Mushoku Tensei: Jobless Reincarnation",
    "posterPath": "/gLKOYIMyKlUHW0SVdskhgf9C0yy.jpg",
    "year": "2021",
    "overview": "When a 34-year-old underachiever gets run over by a truck, his story doesn't end there. Reincarnated in a new world as an infant, Rudy will seize every opportunity to live the life he's always wanted. Armed with new friends, some freshly acquired magical abilities, and the courage to do the things he's always dreamed of, he's embarking on an epic adventure—with all of his past experience intact!"
  },
  {
    "tmdbId": 86031,
    "type": "show",
    "name": "Dr. STONE",
    "posterPath": "/xbZQ3fDl0y5mt0ARwfeyrgQ4JTw.jpg",
    "year": "2019",
    "overview": "One fateful day, all of humanity was petrified by a blinding flash of light. After several millennia, high schooler Taiju awakens and finds himself lost in a world of statues. However, he’s not alone! His science-loving friend Senku’s been up and running for a few months and he's got a grand plan in mind—to kickstart civilization with the power of science!"
  },
  {
    "tmdbId": 85937,
    "type": "show",
    "name": "Demon Slayer: Kimetsu no Yaiba",
    "posterPath": "/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
    "year": "2019",
    "overview": "After a demon attack leaves his family slain and his sister cursed, Tanjiro embarks upon a perilous journey to find a cure and avenge those he's lost."
  },
  {
    "tmdbId": 1429,
    "type": "show",
    "name": "Attack on Titan",
    "posterPath": "/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
    "year": "2013",
    "overview": "100 years ago, the last remnants of humanity were forced to retreat behind the towering walls of a fortified city to escape the massive, man-eating Titans that roamed the land outside their fortress. Only the members of the Scouting Legion dared to stray beyond the safety of the walls – but even those brave warriors seldom returned alive. Those within the city clung to the illusion of a peaceful existence until the day that dream was shattered, and their slim chance at survival was reduced to one horrifying choice: kill – or be devoured!"
  },
  {
    "tmdbId": 65930,
    "type": "show",
    "name": "My Hero Academia",
    "posterPath": "/phuYuzqWW9ru8EA3HVjE9W2Rr3M.jpg",
    "year": "2016",
    "overview": "What would the world be like if 80 percent of the population manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?\n\nMiddle school student Izuku Midoriya wants to be a hero more than anything, but he hasn't got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all gives him a chance to change his destiny…"
  },
  {
    "tmdbId": 8392,
    "type": "movie",
    "name": "My Neighbor Totoro",
    "posterPath": "/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg",
    "year": "1988",
    "overview": ""
  },
  {
    "tmdbId": 329,
    "type": "movie",
    "name": "Jurassic Park",
    "posterPath": "/63viWuPfYQjRYLSZSZNq7dglJP5.jpg",
    "year": "1993",
    "overview": ""
  },
  {
    "tmdbId": 13,
    "type": "movie",
    "name": "Forrest Gump",
    "posterPath": "/Cw4hIUIAmSYfK9QfaUW5igp9La.jpg",
    "year": "1994",
    "overview": ""
  },
  {
    "tmdbId": 18,
    "type": "movie",
    "name": "The Fifth Element",
    "posterPath": "/fPtlCO1yQtnoLHOwKtWz7db6RGU.jpg",
    "year": "1997",
    "overview": ""
  },
  {
    "tmdbId": 120467,
    "type": "movie",
    "name": "The Grand Budapest Hotel",
    "posterPath": "/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    "year": "2014",
    "overview": ""
  },
  {
    "tmdbId": 333339,
    "type": "movie",
    "name": "Ready Player One",
    "posterPath": "/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg",
    "year": "2018",
    "overview": ""
  }
];

export const DEMO_STATS: ProfileStatsFull = {
  "screenTime": {
    "totalMinutes": 130832,
    "seriesMinutes": 129936,
    "moviesMinutes": 896,
    "equivalences": [
      {
        "label": "heures de visionnage",
        "value": "2 181"
      },
      {
        "label": "films de 2h",
        "value": "≈ 1 090"
      },
      {
        "label": "marathons de 8h",
        "value": "≈ 273"
      }
    ],
    "estimated": true
  },
  "genres": [
    {
      "genre": "Sci-Fi & Fantasy",
      "minutes": 27643,
      "pct": 21
    },
    {
      "genre": "Action & Adventure",
      "minutes": 24644,
      "pct": 19
    },
    {
      "genre": "Animation",
      "minutes": 23252,
      "pct": 18
    },
    {
      "genre": "Comedy",
      "minutes": 21698,
      "pct": 17
    },
    {
      "genre": "Drama",
      "minutes": 5072,
      "pct": 4
    },
    {
      "genre": "Crime",
      "minutes": 3015,
      "pct": 2
    }
  ],
  "monthly": [
    {
      "year": 2015,
      "month": 10,
      "episodes": 54,
      "minutes": 1296,
      "topShow": "The Walking Dead"
    },
    {
      "year": 2015,
      "month": 11,
      "episodes": 62,
      "minutes": 1488,
      "topShow": "How I Met Your Mother"
    },
    {
      "year": 2015,
      "month": 12,
      "episodes": 19,
      "minutes": 456,
      "topShow": "The Big Bang Theory"
    },
    {
      "year": 2016,
      "month": 1,
      "episodes": 0,
      "minutes": 0,
      "topShow": null
    },
    {
      "year": 2016,
      "month": 2,
      "episodes": 19,
      "minutes": 456,
      "topShow": "Dexter"
    },
    {
      "year": 2016,
      "month": 3,
      "episodes": 27,
      "minutes": 648,
      "topShow": "Le cœur a ses raisons"
    },
    {
      "year": 2016,
      "month": 4,
      "episodes": 13,
      "minutes": 312,
      "topShow": "Modern Family"
    },
    {
      "year": 2016,
      "month": 5,
      "episodes": 27,
      "minutes": 648,
      "topShow": "Psycho-Pass"
    },
    {
      "year": 2016,
      "month": 6,
      "episodes": 4,
      "minutes": 96,
      "topShow": "Game of Thrones"
    },
    {
      "year": 2016,
      "month": 7,
      "episodes": 5,
      "minutes": 120,
      "topShow": "Mr. Pickles"
    },
    {
      "year": 2016,
      "month": 8,
      "episodes": 0,
      "minutes": 0,
      "topShow": null
    },
    {
      "year": 2016,
      "month": 9,
      "episodes": 30,
      "minutes": 720,
      "topShow": "Arrested Development"
    },
    {
      "year": 2016,
      "month": 10,
      "episodes": 18,
      "minutes": 432,
      "topShow": "Scream: The TV Series"
    },
    {
      "year": 2016,
      "month": 11,
      "episodes": 24,
      "minutes": 576,
      "topShow": "Black Mirror"
    },
    {
      "year": 2016,
      "month": 12,
      "episodes": 64,
      "minutes": 1536,
      "topShow": "New Girl"
    },
    {
      "year": 2017,
      "month": 1,
      "episodes": 81,
      "minutes": 1944,
      "topShow": "New Girl"
    },
    {
      "year": 2017,
      "month": 2,
      "episodes": 29,
      "minutes": 696,
      "topShow": "The Ministry of Time"
    },
    {
      "year": 2017,
      "month": 3,
      "episodes": 62,
      "minutes": 1488,
      "topShow": "The Simpsons"
    },
    {
      "year": 2017,
      "month": 4,
      "episodes": 53,
      "minutes": 1272,
      "topShow": "Fullmetal Alchemist"
    },
    {
      "year": 2017,
      "month": 5,
      "episodes": 71,
      "minutes": 1704,
      "topShow": "Modern Family"
    },
    {
      "year": 2017,
      "month": 6,
      "episodes": 30,
      "minutes": 720,
      "topShow": "Modern Family"
    },
    {
      "year": 2017,
      "month": 7,
      "episodes": 30,
      "minutes": 720,
      "topShow": "Campione!"
    },
    {
      "year": 2017,
      "month": 8,
      "episodes": 113,
      "minutes": 2712,
      "topShow": "Code Lyoko"
    },
    {
      "year": 2017,
      "month": 9,
      "episodes": 49,
      "minutes": 1176,
      "topShow": "Hunter x Hunter (2011)"
    },
    {
      "year": 2017,
      "month": 10,
      "episodes": 131,
      "minutes": 3144,
      "topShow": null
    },
    {
      "year": 2017,
      "month": 11,
      "episodes": 117,
      "minutes": 2808,
      "topShow": "Hunter x Hunter (2011)"
    },
    {
      "year": 2017,
      "month": 12,
      "episodes": 113,
      "minutes": 2712,
      "topShow": "Hunter x Hunter (2011)"
    },
    {
      "year": 2018,
      "month": 1,
      "episodes": 53,
      "minutes": 1272,
      "topShow": "Sonic X"
    },
    {
      "year": 2018,
      "month": 2,
      "episodes": 35,
      "minutes": 840,
      "topShow": "Is It Wrong to Try to Pick Up Girls in a Dungeon?"
    },
    {
      "year": 2018,
      "month": 3,
      "episodes": 33,
      "minutes": 792,
      "topShow": "Stranger Things"
    },
    {
      "year": 2018,
      "month": 4,
      "episodes": 28,
      "minutes": 672,
      "topShow": "A Series of Unfortunate Events"
    },
    {
      "year": 2018,
      "month": 5,
      "episodes": 36,
      "minutes": 864,
      "topShow": "The Seven Deadly Sins"
    },
    {
      "year": 2018,
      "month": 6,
      "episodes": 141,
      "minutes": 3384,
      "topShow": "Kaamelott"
    },
    {
      "year": 2018,
      "month": 7,
      "episodes": 133,
      "minutes": 3192,
      "topShow": "Kaamelott"
    },
    {
      "year": 2018,
      "month": 8,
      "episodes": 26,
      "minutes": 624,
      "topShow": "Black Butler"
    },
    {
      "year": 2018,
      "month": 9,
      "episodes": 69,
      "minutes": 1656,
      "topShow": "A Very Secret Service"
    },
    {
      "year": 2018,
      "month": 10,
      "episodes": 79,
      "minutes": 1896,
      "topShow": "The Legend of Korra"
    },
    {
      "year": 2018,
      "month": 11,
      "episodes": 37,
      "minutes": 888,
      "topShow": "B: The Beginning"
    },
    {
      "year": 2018,
      "month": 12,
      "episodes": 85,
      "minutes": 2040,
      "topShow": "Overlord"
    },
    {
      "year": 2019,
      "month": 1,
      "episodes": 44,
      "minutes": 1056,
      "topShow": "Sirius the Jaeger"
    },
    {
      "year": 2019,
      "month": 2,
      "episodes": 65,
      "minutes": 1560,
      "topShow": "Kuromukuro"
    },
    {
      "year": 2019,
      "month": 3,
      "episodes": 80,
      "minutes": 1920,
      "topShow": "Lastman"
    },
    {
      "year": 2019,
      "month": 4,
      "episodes": 70,
      "minutes": 1680,
      "topShow": "Blue Exorcist"
    },
    {
      "year": 2019,
      "month": 5,
      "episodes": 71,
      "minutes": 1704,
      "topShow": "Boruto: Naruto Next Generations"
    },
    {
      "year": 2019,
      "month": 6,
      "episodes": 50,
      "minutes": 1200,
      "topShow": "Lucifer"
    },
    {
      "year": 2019,
      "month": 7,
      "episodes": 42,
      "minutes": 1008,
      "topShow": "Lucifer"
    },
    {
      "year": 2019,
      "month": 8,
      "episodes": 98,
      "minutes": 2352,
      "topShow": "Black Clover"
    },
    {
      "year": 2019,
      "month": 9,
      "episodes": 63,
      "minutes": 1512,
      "topShow": "Black Clover"
    },
    {
      "year": 2019,
      "month": 10,
      "episodes": 19,
      "minutes": 456,
      "topShow": "Disenchantment"
    },
    {
      "year": 2019,
      "month": 11,
      "episodes": 25,
      "minutes": 600,
      "topShow": "The Dragon Prince"
    },
    {
      "year": 2019,
      "month": 12,
      "episodes": 22,
      "minutes": 528,
      "topShow": "Pokémon"
    },
    {
      "year": 2020,
      "month": 1,
      "episodes": 131,
      "minutes": 3144,
      "topShow": "Pokémon"
    },
    {
      "year": 2020,
      "month": 2,
      "episodes": 64,
      "minutes": 1536,
      "topShow": "Food Wars!"
    },
    {
      "year": 2020,
      "month": 3,
      "episodes": 30,
      "minutes": 720,
      "topShow": "Castlevania"
    },
    {
      "year": 2020,
      "month": 4,
      "episodes": 91,
      "minutes": 2184,
      "topShow": "Pokémon"
    },
    {
      "year": 2020,
      "month": 5,
      "episodes": 103,
      "minutes": 2472,
      "topShow": "Pokémon"
    },
    {
      "year": 2020,
      "month": 6,
      "episodes": 40,
      "minutes": 960,
      "topShow": "Tower of God"
    },
    {
      "year": 2020,
      "month": 7,
      "episodes": 65,
      "minutes": 1560,
      "topShow": "The Rising of the Shield Hero"
    },
    {
      "year": 2020,
      "month": 8,
      "episodes": 73,
      "minutes": 1752,
      "topShow": "The Seven Deadly Sins"
    },
    {
      "year": 2020,
      "month": 9,
      "episodes": 25,
      "minutes": 600,
      "topShow": "Dorohedoro"
    },
    {
      "year": 2020,
      "month": 10,
      "episodes": 15,
      "minutes": 360,
      "topShow": "Dragon's Dogma"
    },
    {
      "year": 2020,
      "month": 11,
      "episodes": 26,
      "minutes": 624,
      "topShow": "Is It Wrong to Try to Pick Up Girls in a Dungeon?"
    },
    {
      "year": 2020,
      "month": 12,
      "episodes": 101,
      "minutes": 2424,
      "topShow": "Demon Slayer: Kimetsu no Yaiba"
    },
    {
      "year": 2021,
      "month": 1,
      "episodes": 83,
      "minutes": 1992,
      "topShow": "My Hero Academia"
    },
    {
      "year": 2021,
      "month": 2,
      "episodes": 57,
      "minutes": 1368,
      "topShow": "Pokémon"
    },
    {
      "year": 2021,
      "month": 3,
      "episodes": 106,
      "minutes": 2544,
      "topShow": "Pokémon"
    },
    {
      "year": 2021,
      "month": 4,
      "episodes": 87,
      "minutes": 2088,
      "topShow": "Pokémon"
    },
    {
      "year": 2021,
      "month": 5,
      "episodes": 135,
      "minutes": 3240,
      "topShow": "Pokémon"
    },
    {
      "year": 2021,
      "month": 6,
      "episodes": 97,
      "minutes": 2328,
      "topShow": "Pokémon"
    },
    {
      "year": 2021,
      "month": 7,
      "episodes": 64,
      "minutes": 1536,
      "topShow": "Pokémon"
    },
    {
      "year": 2021,
      "month": 8,
      "episodes": 96,
      "minutes": 2304,
      "topShow": "The Magicians (2015)"
    },
    {
      "year": 2021,
      "month": 9,
      "episodes": 98,
      "minutes": 2352,
      "topShow": "Pokémon"
    },
    {
      "year": 2021,
      "month": 10,
      "episodes": 86,
      "minutes": 2064,
      "topShow": "Time Jam: Valerian & Laureline"
    },
    {
      "year": 2021,
      "month": 11,
      "episodes": 19,
      "minutes": 456,
      "topShow": "Big Mouth"
    },
    {
      "year": 2021,
      "month": 12,
      "episodes": 14,
      "minutes": 336,
      "topShow": "Demon Slayer: Kimetsu no Yaiba"
    },
    {
      "year": 2022,
      "month": 1,
      "episodes": 46,
      "minutes": 1104,
      "topShow": "The Witcher"
    },
    {
      "year": 2022,
      "month": 2,
      "episodes": 5,
      "minutes": 120,
      "topShow": "Attack on Titan"
    },
    {
      "year": 2022,
      "month": 3,
      "episodes": 18,
      "minutes": 432,
      "topShow": "Disenchantment"
    },
    {
      "year": 2022,
      "month": 4,
      "episodes": 7,
      "minutes": 168,
      "topShow": "Star Trek: Picard"
    },
    {
      "year": 2022,
      "month": 5,
      "episodes": 66,
      "minutes": 1584,
      "topShow": "My Hero Academia"
    },
    {
      "year": 2022,
      "month": 6,
      "episodes": 4,
      "minutes": 96,
      "topShow": "The Rising of the Shield Hero"
    },
    {
      "year": 2022,
      "month": 7,
      "episodes": 36,
      "minutes": 864,
      "topShow": "My Hero Academia"
    },
    {
      "year": 2022,
      "month": 8,
      "episodes": 34,
      "minutes": 816,
      "topShow": "My Hero Academia"
    },
    {
      "year": 2022,
      "month": 9,
      "episodes": 57,
      "minutes": 1368,
      "topShow": "Pokémon"
    },
    {
      "year": 2022,
      "month": 10,
      "episodes": 9,
      "minutes": 216,
      "topShow": "My Hero Academia"
    },
    {
      "year": 2022,
      "month": 11,
      "episodes": 13,
      "minutes": 312,
      "topShow": "The Dragon Prince"
    },
    {
      "year": 2022,
      "month": 12,
      "episodes": 8,
      "minutes": 192,
      "topShow": "My Hero Academia"
    },
    {
      "year": 2023,
      "month": 1,
      "episodes": 7,
      "minutes": 168,
      "topShow": "Is It Wrong to Try to Pick Up Girls in a Dungeon?"
    },
    {
      "year": 2023,
      "month": 2,
      "episodes": 35,
      "minutes": 840,
      "topShow": "Star Trek: Lower Decks"
    },
    {
      "year": 2023,
      "month": 3,
      "episodes": 28,
      "minutes": 672,
      "topShow": "Smiley"
    },
    {
      "year": 2023,
      "month": 4,
      "episodes": 31,
      "minutes": 744,
      "topShow": "Sonic Prime"
    },
    {
      "year": 2023,
      "month": 5,
      "episodes": 41,
      "minutes": 984,
      "topShow": "Kemono Jihen"
    },
    {
      "year": 2023,
      "month": 6,
      "episodes": 21,
      "minutes": 504,
      "topShow": "Human Resources (2022)"
    },
    {
      "year": 2023,
      "month": 7,
      "episodes": 31,
      "minutes": 744,
      "topShow": "The Dragon Prince"
    },
    {
      "year": 2023,
      "month": 8,
      "episodes": 5,
      "minutes": 120,
      "topShow": "Mushoku Tensei: Jobless Reincarnation"
    },
    {
      "year": 2023,
      "month": 9,
      "episodes": 45,
      "minutes": 1080,
      "topShow": "Pokémon"
    },
    {
      "year": 2023,
      "month": 10,
      "episodes": 138,
      "minutes": 3312,
      "topShow": "One Piece"
    },
    {
      "year": 2023,
      "month": 11,
      "episodes": 35,
      "minutes": 840,
      "topShow": "One Piece"
    },
    {
      "year": 2023,
      "month": 12,
      "episodes": 11,
      "minutes": 264,
      "topShow": "Dr. STONE"
    },
    {
      "year": 2024,
      "month": 1,
      "episodes": 26,
      "minutes": 624,
      "topShow": "JUJUTSU KAISEN"
    },
    {
      "year": 2024,
      "month": 2,
      "episodes": 35,
      "minutes": 840,
      "topShow": "Myriad Colors Phantom World"
    },
    {
      "year": 2024,
      "month": 3,
      "episodes": 17,
      "minutes": 408,
      "topShow": "Wakfu"
    },
    {
      "year": 2024,
      "month": 4,
      "episodes": 1,
      "minutes": 24,
      "topShow": "Solo Leveling"
    },
    {
      "year": 2024,
      "month": 5,
      "episodes": 11,
      "minutes": 264,
      "topShow": "Mushoku Tensei: Jobless Reincarnation"
    },
    {
      "year": 2024,
      "month": 6,
      "episodes": 12,
      "minutes": 288,
      "topShow": "Demon Slayer: Kimetsu no Yaiba"
    },
    {
      "year": 2024,
      "month": 7,
      "episodes": 7,
      "minutes": 168,
      "topShow": "My Hero Academia"
    },
    {
      "year": 2024,
      "month": 8,
      "episodes": 2,
      "minutes": 48,
      "topShow": "My Hero Academia"
    },
    {
      "year": 2024,
      "month": 9,
      "episodes": 0,
      "minutes": 0,
      "topShow": null
    },
    {
      "year": 2024,
      "month": 10,
      "episodes": 12,
      "minutes": 288,
      "topShow": "Is It Wrong to Try to Pick Up Girls in a Dungeon?"
    },
    {
      "year": 2024,
      "month": 11,
      "episodes": 2,
      "minutes": 48,
      "topShow": "Blue Exorcist"
    },
    {
      "year": 2024,
      "month": 12,
      "episodes": 0,
      "minutes": 0,
      "topShow": null
    },
    {
      "year": 2025,
      "month": 1,
      "episodes": 6,
      "minutes": 144,
      "topShow": "Dr. STONE"
    },
    {
      "year": 2025,
      "month": 2,
      "episodes": 1,
      "minutes": 24,
      "topShow": "Solo Leveling"
    },
    {
      "year": 2025,
      "month": 3,
      "episodes": 55,
      "minutes": 1320,
      "topShow": "KonoSuba – God’s blessing on this wonderful world!!"
    },
    {
      "year": 2025,
      "month": 4,
      "episodes": 1,
      "minutes": 24,
      "topShow": "Shangri-La Frontier"
    },
    {
      "year": 2025,
      "month": 5,
      "episodes": 0,
      "minutes": 0,
      "topShow": null
    },
    {
      "year": 2025,
      "month": 6,
      "episodes": 0,
      "minutes": 0,
      "topShow": null
    },
    {
      "year": 2025,
      "month": 7,
      "episodes": 0,
      "minutes": 0,
      "topShow": null
    },
    {
      "year": 2025,
      "month": 8,
      "episodes": 6,
      "minutes": 144,
      "topShow": "Dr. STONE"
    },
    {
      "year": 2025,
      "month": 9,
      "episodes": 16,
      "minutes": 384,
      "topShow": "DAN DA DAN"
    },
    {
      "year": 2025,
      "month": 10,
      "episodes": 8,
      "minutes": 192,
      "topShow": "My Hero Academia"
    },
    {
      "year": 2025,
      "month": 11,
      "episodes": 5,
      "minutes": 120,
      "topShow": "My Hero Academia"
    },
    {
      "year": 2025,
      "month": 12,
      "episodes": 33,
      "minutes": 792,
      "topShow": "Frieren: Beyond Journey's End"
    },
    {
      "year": 2026,
      "month": 1,
      "episodes": 7,
      "minutes": 168,
      "topShow": "Hell's Paradise"
    },
    {
      "year": 2026,
      "month": 2,
      "episodes": 0,
      "minutes": 0,
      "topShow": null
    },
    {
      "year": 2026,
      "month": 3,
      "episodes": 6,
      "minutes": 144,
      "topShow": "Hell's Paradise"
    },
    {
      "year": 2026,
      "month": 4,
      "episodes": 6,
      "minutes": 144,
      "topShow": "Dr. STONE"
    },
    {
      "year": 2026,
      "month": 5,
      "episodes": 0,
      "minutes": 0,
      "topShow": null
    },
    {
      "year": 2026,
      "month": 6,
      "episodes": 53,
      "minutes": 1272,
      "topShow": "Fire Force"
    }
  ],
  "quantileThresholds": [
    12,
    28,
    46,
    79
  ],
  "annual": [
    {
      "year": 2015,
      "episodes": 135,
      "minutes": 3240
    },
    {
      "year": 2016,
      "episodes": 231,
      "minutes": 5544
    },
    {
      "year": 2017,
      "episodes": 879,
      "minutes": 21096
    },
    {
      "year": 2018,
      "episodes": 755,
      "minutes": 18120
    },
    {
      "year": 2019,
      "episodes": 649,
      "minutes": 15576
    },
    {
      "year": 2020,
      "episodes": 764,
      "minutes": 18336
    },
    {
      "year": 2021,
      "episodes": 942,
      "minutes": 22608
    },
    {
      "year": 2022,
      "episodes": 303,
      "minutes": 7272
    },
    {
      "year": 2023,
      "episodes": 428,
      "minutes": 10272
    },
    {
      "year": 2024,
      "episodes": 125,
      "minutes": 3000
    },
    {
      "year": 2025,
      "episodes": 131,
      "minutes": 3144
    },
    {
      "year": 2026,
      "episodes": 72,
      "minutes": 1728
    }
  ],
  "records": {
    "mostActiveYear": 2021,
    "biggestMonth": {
      "year": 2018,
      "month": 6,
      "episodes": 141
    },
    "longestStreakDays": 14,
    "biggestBingeDay": {
      "date": "2018-07-01",
      "episodes": 61
    }
  },
  "generatedAt": "2026-08-09T12:00:00.000Z"
};
