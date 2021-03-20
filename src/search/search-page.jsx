import React, { Component } from 'react'
import { http } from '../apiInterceptor'
import youtubeImg from "../assets/youtube_logo_dark.png"
import "./search-page.css";
import { Pagination, Dropdown, Button } from 'semantic-ui-react'


class searchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            youtubeList: [],
            pageInfo: {},
            nextPageToken: "",
            searchValue: "",
            totalPages: 0,
            pageNumber: 1,
            prevPageToken: "",
            videoListCount: [
                {
                    text: "10 videos per page",
                    value: 10
                },
                {
                    text: "20 videos per page",
                    value: 20
                },
                {
                    text: "30 videos per page",
                    value: 30
                },
                {
                    text: "40 videos per page",
                    value: 40
                },
                {
                    text: "50 videos per page",
                    value: 50
                },
            ],
            numberOfVideos: 10
        }
    }


    componentDidMount() {
        if(sessionStorage.getItem("loggedIn")!=="true"){
            this.props.history.push('/login')
        }
         http.get('/search',{
            params:{
                q:"",
                maxResults:this.state.numberOfVideos,
                part:"snippet",
            }
        }).then(resopnse=>
            {
                this.setState({
                    youtubeList:resopnse.data.items,
                    pageInfo:resopnse.data.pageInfo,
                    nextPageToken:resopnse.data.nextPageToken,
                    totalPages:resopnse.data.pageInfo.totalResults
                })
            })
    }

    handleSearchValue = (event) => {
        this.setState({
            searchValue: event.target.value
        })
    }

    handleSubmit = () => {
        http.get('/search', {
            params: {
                q: this.state.searchValue,
                maxResults: this.state.numberOfVideos,
                part: "snippet",
            }
        }).then(resopnse => {
            this.setState({
                youtubeList: resopnse.data.items,
                pageInfo: resopnse.data.pageInfo,
                nextPageToken: resopnse.data.nextPageToken,
                totalPages: resopnse.data.pageInfo.totalResults
            })
        })

    }

    handlePagination = (e, { activePage }) => {
        console.log(e, activePage)
        if (activePage > this.state.pageNumber) {
            http.get('/search', {
                params: {
                    q: this.state.searchValue,
                    maxResults: this.state.numberOfVideos,
                    part: "snippet",
                    pageToken: this.state.nextPageToken
                }
            }).then(resopnse => {
                this.setState({
                    youtubeList: resopnse.data.items,
                    pageInfo: resopnse.data.pageInfo,
                    nextPageToken: resopnse.data.nextPageToken,
                    prevPageToken: resopnse.data.prevPageToken,
                    totalPages: resopnse.data.pageInfo.totalResults
                })
            })
        } else if (activePage < this.state.pageNumber) {
            http.get('/search', {
                params: {
                    q: this.state.searchValue,
                    maxResults: this.state.numberOfVideos,
                    part: "snippet",
                    pageToken: this.state.prevPageToken
                }
            }).then(resopnse => {
                this.setState({
                    youtubeList: resopnse.data.items,
                    pageInfo: resopnse.data.pageInfo,
                    nextPageToken: resopnse.data.nextPageToken,
                    prevPageToken: resopnse.data.prevPageToken,
                    totalPages: resopnse.data.pageInfo.totalResults
                })
            })
        }
        this.setState({
            pageNumber: activePage
        })
    }

    handleNoOfVideoShow = data => {
        this.setState({
            numberOfVideos: data.value
        })
        http.get('/search', {
            params: {
                q: this.state.searchValue,
                maxResults: data.value,
                part: "snippet",
            }
        }).then(resopnse => {
            this.setState({
                youtubeList: resopnse.data.items,
                pageInfo: resopnse.data.pageInfo,
                nextPageToken: resopnse.data.nextPageToken,
                totalPages: resopnse.data.pageInfo.totalResults
            })
        })
    }

    handleNextPage = () => {
        this.props.history.push('/desktop-Mobile-page')
    }

    handleLogout=()=>{
        this.props.history.push('/login');
        sessionStorage.removeItem('loggedIn')
        window.location.reload();

    }

    render() {
        return (
            <div>
                <div className="btn-btn-drop">
                <Button onClick={this.handleLogout}
                       className="Button" >Logout</Button>
                <Button className="Button" onClick={this.handleNextPage}
                >Next Page</Button>
                </div>
                <img className="youtubeImg" src={youtubeImg} alt="" />
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: "0% 2% 0% 2%" }}>
                    <Dropdown
                        className="row-dropdown"
                        value={this.state.numberOfVideos}
                        placeholder="Select number of rows"
                        selection
                        options={this.state.videoListCount}
                        onChange={(e, data) =>
                            this.handleNoOfVideoShow(data)
                        }
                    />
                    <Pagination
                        boundaryRange={0}
                        defaultActivePage={1}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        activePage={this.state.pageNumber}
                        totalPages={this.state.totalPages}
                        onPageChange={this.handlePagination}
                    />
                </div>
                <br />
                <input type="text" id="Input" value={this.state.searchValue}
                    onChange={this.handleSearchValue}
                    placeholder="Search" title="Type Search" />
                <button type="submit" className="button" onClick={this.handleSubmit}><i className="fa fa-search"></i></button>
                <br />

                <div className="row">
                    {
                        this.state.youtubeList.map((videoList, key) =>
                            <div className="item" key={key}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoList.id.videoId}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write;
                      encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                                <br />
                                <p className="thumbNail-row">
                                    <img className="thumbnails" src={videoList.snippet.thumbnails.default.url} alt="" />
                                    <span>
                                        {videoList.snippet.title}
                                    </span>
                                </p>
                                <p>
                                    {videoList.snippet.channelTitle}
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default searchPage

