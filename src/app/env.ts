const env = {
    appwirte : {
        endpoint :String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        projectid :String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apikey : String(process.env.APPWRITE_API_KEY)
    }
}

export default env