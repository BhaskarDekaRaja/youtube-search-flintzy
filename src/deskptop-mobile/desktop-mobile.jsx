import React, { Component } from 'react'
import Carousel from 'react-elastic-carousel';
import { Button, Dropdown } from 'semantic-ui-react';
import { http } from '../apiInterceptor'
import "./desktop-mobile.css";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
];
class desktopMobile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bgColor1: "gray",
            bgColor2: "white",
            videoListCount: [
                {
                    text: "10 videos per page",
                    value: 10
                },
                {
                    text: "20 videos per page",
                    value: 20
                }
            ],
            numberOfVideos: 10,
            youtubeList: [],
            searchValue:"react js"
        }
    }
    

    componentDidMount(){
        if(sessionStorage.getItem("loggedIn")!=="true"){
            this.props.history.push('/login')
        }

        http.get('/search',{
            params:{
                q:"react js",
                maxResults:this.state.numberOfVideos,
                part:"snippet",
            }
        }).then(resopnse=>
            {
                this.setState({
                    youtubeList:resopnse.data.items
                })
            })
    }

    handleNoOfVideoShow = data => {
        this.setState({
            numberOfVideos: data.value
        })
         http.get('/search',{
            params:{
                q:this.state.searchValue,
                maxResults:data.value,
                part:"snippet",
            }
        }).then(resopnse=>
            {
                this.setState({
                    youtubeList:resopnse.data.items
                })
            })
    }

    changeTab = (data) => {
        if(data == "react js")
        {
        this.setState({
            bgColor1: "gray",
            bgColor2: "white",
            searchValue:"react js"
        })
        
    }else if(data == "angular"){
        this.setState({
            bgColor1: "white",
            bgColor2: "gray",
            searchValue:"angular"
        })
    }
    http.get('/search',{
        params:{
            q:data,
            maxResults:this.state.numberOfVideos,
            part:"snippet",
        }
    }).then(resopnse=>
        {
            this.setState({
                youtubeList:resopnse.data.items
            })
        })
    }


    handlePreviousPage = () => {
        this.props.history.push('/search-page')
    }

    handleLogout=()=>{
        this.props.history.push('/login');
        sessionStorage.removeItem('loggedIn')
        window.location.reload();

    }

    render() {
        return (
            <>
                <div>
                    <div className="btn-btn-drop">
                        <Button className="btn-prev" onClick={this.handlePreviousPage}
                        >Previous Page</Button>
                        <Button className="btn-prev" onClick={this.handleLogout}
                        >Logout</Button>
                    </div>
                    <br />
                    <div className="mButtons">
                        <div className="btn-btn-drop">
                            {
                                this.state.videoListCount.map((count, key) =>
                                    <button key={key} onClick={
                                        (e) =>
                                            this.handleNoOfVideoShow(count)
                                    }>{count.text}</button>
                                )
                            }
                        </div>
                    </div>
                </div>
                <br />
                <div className="header-desk">
                    <div className="header">
                        <div className="tab">
                            <button style={{ backgroundColor: this.state.bgColor1 }}
                                onClick={(e)=>this.changeTab('react js')}>React</button>

                            <button style={{ backgroundColor: this.state.bgColor2 }}
                                onClick={(e)=>this.changeTab('angular')}>Angular</button>

                        </div>

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
                    </div>
                </div>
                <br />
                <div style={{ paddingTop: '5%' }}>
                    <Carousel breakPoints={breakPoints}>
                        {this.state.youtubeList.map((videoList, key) => <iframe key={key}
                            src={`https://www.youtube.com/embed/${videoList.id.videoId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write;
                      encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>)}
                    </Carousel>
                    <div className="tabM">
                    <button style={{ backgroundColor: this.state.bgColor1 }}
                                onClick={(e)=>this.changeTab('react js')}>React</button>

                            <button style={{ backgroundColor: this.state.bgColor2 }}
                                onClick={(e)=>this.changeTab('angular')}>Angular</button>

                    </div>
                </div>
            </>
        )

    }
}

export default desktopMobile
