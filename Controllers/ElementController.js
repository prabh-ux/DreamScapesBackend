

export const ElementController = async (req, res) => {

    const { query, page } = req.body;

    console.log(query, page);
    try {


        const apiUrl = `https://api.openverse.engineering/v1/images?q=${query || 'illustration'}&page=${page || 1}`;


        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data || !data.results) {
            return res.status(404).json({ msg: "failed to fetch data" });
        }

        // // filtering valid imageurl
        // const validImage = await Promise.all(
        //     data.results.map(async (item) => {

        //         try {
        //             const headRes = await fetch(item.url, { method: "HEAD" });

        //             const isImage = headRes.ok && headRes.headers.get("Content-Type")?.startsWith("image/");


        //             if (isImage) {
        //                 return item;
        //             }

        //         } catch (error) {


        //         }
        //         return null;
        //     })

        // )

        const filteredImages = data.results.filter(item => item.url && item.thumbnail).map(item => ({
            id: item.id,
            title: item.title,
            thumbnail: item.thumbnail,
            url: item.url,
            source: item.source,
            tags: item.tags
        }));
        return res.status(200).json({ results: filteredImages });
    } catch (error) {
        return res.status(500).json("Error while fetching data " + error);
    }



};