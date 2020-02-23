import React, { Component } from 'react'
import './MemeGen.css'

class MemeGen extends Component {
    constructor() {
        super()
        this.state = {
            topText : "",
            bottomText: "",
            randomImg: "https:\/\/i.imgflip.com\/odluv.jpg",
            imageUrls : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                console.log(memes[7].url)
                this.setState({ imageUrls: memes })
            })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        /** 
         *  create random num for array len
         *  set new random ur to State URl
         *  
         */
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.imageUrls.length)
        const randImg = this.state.imageUrls[randNum].url
        this.setState({
            randomImg: randImg
        })
    }

    render() {
     
            return (
                <>
                    <div class="jumbotron jumbotron-fluid ">
                        <div class="container">
                            <h1 class="display-4 meme-text">Make A Meme</h1>
                            <p class="lead">This is React App that uses the imgflip API to generate random memes</p>
                        </div>
                    </div>

                    <div className="container text-center"> 
                        
                        <form className="meme-form" onSubmit={this.handleSubmit}>
                        <input
                            className = "form-control form-control-lg"
                            type="text"
                            name="topText"
                            placeholder="Top Text"
                            value={this.state.topText}
                            onChange={this.handleChange}
                        /><br />

                        <input
                            className="form-control form-control-lg"
                            type="text"
                            name="bottomText"
                            placeholder="Bottom Text"
                            onChange={this.handleChange}
                            value={this.state.bottomText}
                            />
                            <br />
                            <div className="imagecontainer" >
                                <img src={this.state.randomImg} />
                                <div className="topText"> <h2> {this.state.topText}</h2> </div>
                                <div className="bottomText"> <h2> {this.state.bottomText}</h2> </div>
                            </div>
                            <br />
                            <button className="btn btn-primary btn-lg" >Generate New Random Image</button>
                        </form>
                        
                    </div>   
                   
                   
                </>
                )
        }
    }

export default MemeGen