import express from 'express'
import session from 'express-session'
import { WorkOS } from '@workos-inc/node'

const app = express()
const router = express.Router()

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
)

const workos = new WorkOS(process.env.WORKOS_API_KEY)
const clientID = process.env.WORKOS_CLIENT_ID
const organizationID = 'org_01H37HZA9RZZAAXZGTS07GGJK0' 
const redirectURI = 'http://localhost:8000/callback'
const state = ''
const directoryGroup = 'directory_group_01H30BCQG77NACW58VPVKYX2TV'

router.get('/', function (req, res) {
    if (session.isloggedin) {
        res.render('login_successful.ejs', {
            profile: session.profile,
            first_name: session.first_name,
            last_name: session.last_name,
        })
    } else {
        res.render('index.ejs', { title: 'Home' })
    }
})

router.get('/login', (req, res) => {
    try {
        const url = workos.sso.getAuthorizationURL({
            organization: organizationID,
            clientID: clientID,
            redirectURI: redirectURI,
            state: state,
        })

        res.redirect(url)
    } catch (error) {
        console.log('HIT')
        res.render('error.ejs', { error: error })
    }
})

router.get('/callback', async (req, res) => {
    try {
        const { code } = req.query

        const profile = await workos.sso.getProfileAndToken({
            code,
            clientID,
        })

        const groupInfo = await workos.directorySync.listUsers({
            group: directoryGroup, 
        })

        const json_profile = JSON.stringify(profile, null, 4)
        session.first_name = profile.profile.first_name
        session.last_name = profile.profile.last_name
        session.profile = json_profile
        session.isloggedin = true
        session.firstPersonFirst = groupInfo.data[0].first_name
        session.firstPersonLast = groupInfo.data[0].last_name
        session.firstPersonEmail = groupInfo.data[0].username
        res.redirect('/')
    } catch (error) {
        res.render('error.ejs', { error: error })
    }
})

router.get('/logout', async (req, res) => {
    try {
        session.first_name = null
        session.profile = null
        session.isloggedin = null

        res.redirect('/')
    } catch (error) {
        res.render('error.ejs', { error: error })
    }
})


router.get('/users', async (req, res) => {
    try {
      res.render('usersList.ejs', {
        firstPersonFirst : session.firstPersonFirst,
        firstPersonLast : session.firstPersonLast,
        firstPersonEmail : session.firstPersonEmail,
        secondPersonFirst : session.secondPersonFirst,
        secondPersonLast : session.secondPersonLast,
        secondPersonEmail : session.secondPersonEmail,
        thirdPersonFirst : session.thirdPersonFirst,
        thirdPersonLast : session.thirdPersonLast,
        thirdPersonEmail : session.thirdPersonEmail,
        fourthPersonFirst : session.fourthPersonFirst,
        fourthPersonLast : session.fourthPersonLast,
        fourthPersonEmail : session.fourthPersonEmail,
        fifthPersonFirst : session.fifthPersonFirst,
        fifthPersonLast : session.fifthPersonLast,
        fifthPersonEmail : session.fifthPersonEmail,
      });
    } catch (error) {
        res.render('error.ejs', { error: error })
    }
})

export default router
