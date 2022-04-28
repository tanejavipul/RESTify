function LatestBlog(props) {
    return (
        <>
            <div class="widget-body">
                <div class="latest-post-aside media">
                    <div class="d-flex lpa-left media-body justify-content-between">
                        <div class="lpa-title">
                            <a href={`/blogs/${props.id}/`}><h4 class="list-inline-item">{props.title}</h4></a>
                        </div>
                        <div class="lpa-meta">
                            <h4 class="ml-2">{props.last_modified}</h4>
                        </div>
                    </div>
                    <div class="lpa-right">
                        <a href={`/blogs/${props.id}/`}>
                            <img src={props.primary_photo} title="" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LatestBlog;