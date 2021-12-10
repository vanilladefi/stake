import mailchimp from '@mailchimp/mailchimp_marketing'
import type { NextApiHandler } from 'next'
import { isValidEmail } from '../../utils/helpers'

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER
})

const handler: NextApiHandler = async (req, res) => {
    const { email } = req.body

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Valid Email is required' })
    }

    try {
        if (!process.env.MAILCHIMP_AUDIENCE_ID) {
            throw Error("Mailchimp audience id not specified") // 500
        }

        await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
            email_address: email,
            status: 'subscribed' as any
        })

        return res.status(201).json({ done: true })
    } catch (error) {
        console.error("subsscribe api handler error: ", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

export default handler