import React, { Component } from 'react'
import './chat.css'
import httpService from '../services/httpService';
import { io }  from 'socket.io-client';
import axios from 'axios';
export default class ChatConversion extends Component {
    state={
        view:0,
        throwIfNamespace: false,
        form:{q:"",msgSend:""},
        id:"",
        data:{},
        showFiles:false,
        contactList:[],
        messagesList:[]

    }
  socket = io("http://localhost:2411");

  


    // async fetchContacts() {
    //     let response = await httpService.get(`/contacts`);
    //     console.log("response", response);
    //     let { data } = response;
    //     this.setState({ contactList: data });
    //   }
    
    //   async fetchMessages() {
    //     let response = await httpService.get(`/message`);
    //     console.log("response", response);
    //     let { data } = response;
    //     this.setState({ messagesList: data });
    //   }

    fetchContacts = () => {
        axios
          .get("http://localhost:2411/contacts")
          .then((response) => {
            this.setState({ contactList: response.data });
          })
          .catch((error) => {
            console.log(error);
          });
      };

    fetchMessages = () => {
        axios
          .get("http://localhost:2411/messages")
          .then((response) => {
            this.setState({ messagesList: response.data });
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      componentDidMount() {
        this.fetchContacts();
        this.fetchMessages();
        this.listenForNewMessages();
        
      }
      listenForNewMessages = () => {
       this.socket.on("newMessage", (message) => {
        console.log(message);
          this.setState((prevState) => ({
            messagesList: [...prevState.messagesList, message],
          }));
        });
      };

    // connectSocket = () => {
    //     const socket = io("http://localhost:2410");
    
    //     socket.on("connect", () => {
    //       console.log("Connected to socket.io server");
    
    //       // Handle socket.io events here
    //       // Example:
    //       socket.on("newMessage", (data) => {
    //         console.log("Received new message:", data);
    //         this.setState((prevState) => ({
    //           messages: [...prevState.messages, data],
    //         }));
    //       });
    //     });
    //   };

      componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchContacts();
        if (prevProps !== this.props) this.fetchMessages();
      }

    handleFile=()=>{
        this.setState((prevState) => {
            return { showFiles: !prevState.showFiles };
          });
        
    }

    handleChange=(e)=>{
        let { currentTarget: input } = e;
    let formData = { ...this.state.form };
    formData[input.name] = input.value;
    this.setState({ form: formData, searchTerm: input.value }); 
    }

  

    handleSubmit=(e)=>{
        e.preventDefault();
        let s1={...this.state}
  let id=s1.data.id;
  let newDate = new Date()
  let msgFind=s1.contactList.find((n)=>n.id===id);
  console.log(msgFind);
        console.log(this.state.form);
        let msgId=msgFind.id;
        if(msgId){
            let json={id:msgId, messageType: "TEXT",text:this.state.form.msgSend,senderID:msgId,addedOn:newDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
            console.log(json);
         this.postData("/message",json)
        }
        this.setState({form:{q:"",msgSend:""}})
    }

    async postData(url, obj) { 
        let response=await httpService.post(url,obj);
        console.log(response);
    }

    handleUserClick=(id)=>{
        console.log(id);
        let s1={...this.state}
        let data=this.state.contactList.find((n)=>n.id===id);
        console.log(data);
        s1.view=1;
        s1.id=id;
        s1.data=data;
        this.setState(s1);
        this.setState({showFiles:false});
    }
  render() {
    const {view,id,data,showFiles,messagesList,contactList}=this.state
    const {q,msgSend}=this.state.form
    console.log(this.state.data?.name);
    return (
        view===0 ? (
<div className="_1Fm4m">
<div className="_1jJ70">
<div className="_2Ts6i _3RGKj">
    <header className='g0rxnol2 ercejckq cm280p3y p357zi0d gndfcl4n kcgo1i74 ln8gz9je e8h85j61 emrlamx0 aiput80m lyvj5e2u l9g3jx6n f6ipylw5'>
        <div className="_3WByx">
            <div className="g0rxnol2 imageBorderRadius" style={{height:"40px",width:"40px",cursor:"pointer"}}>
<div className="lhggkp7q qq0sjtgm tkdu00h0 p357zi0d gndfcl4n ac2vgrno ln8gz9je ppled2lx bmttxqfw ban5wmpu">
    <svg viewBox="0 0 212 212" height="212" width="212" preserveAspectRatio="xMidYMid meet" class="ln8gz9je ppled2lx" version="1.1" x="0px" y="0px" enable-background="new 0 0 212 212" > <path fill="#DFE5E7" class="background" d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z"></path><g><path fill="#FFFFFF" class="primary" d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z"></path><path fill="#FFFFFF" class="primary" d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z"></path></g></svg>

</div>
            </div>
        </div>
        <div className="_604FD">
            <div className="_1sPvB _2XdMx">
                <span>
                    <div className="_3NdAd">
                        <div className="_3OtEr">
                            <div className="_3ndVb">
                                <span>
                                <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path d="m18 11v2h4v-2zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zm4.4-12.01c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zm-16.4 3.4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3v-12l-5 3zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z" fill="currentColor"></path></svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="_3OtEr">
                        <div className="_3ndVb">
                            <span>
                            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" id="df9d3429-f0ef-48b5-b5eb-f9d27b2deba6" x="0px" y="0px" enable-background="new 0 0 24 24" ><path fill="currentColor" d="M12.072,1.761c-3.941-0.104-7.579,2.105-9.303,5.65c-0.236,0.486-0.034,1.07,0.452,1.305 c0.484,0.235,1.067,0.034,1.304-0.45c1.39-2.857,4.321-4.637,7.496-4.553c0.539,0.02,0.992-0.4,1.013-0.939s-0.4-0.992-0.939-1.013 C12.087,1.762,12.079,1.762,12.072,1.761z M1.926,13.64c0.718,3.876,3.635,6.975,7.461,7.925c0.523,0.13,1.053-0.189,1.183-0.712 c0.13-0.523-0.189-1.053-0.712-1.183c-3.083-0.765-5.434-3.262-6.012-6.386c-0.098-0.53-0.608-0.88-1.138-0.782 C2.178,12.6,1.828,13.11,1.926,13.64z M15.655,21.094c3.642-1.508,6.067-5.006,6.201-8.946c0.022-0.539-0.396-0.994-0.935-1.016 c-0.539-0.022-0.994,0.396-1.016,0.935c0,0.005,0,0.009,0,0.014c-0.107,3.175-2.061,5.994-4.997,7.209 c-0.501,0.201-0.743,0.769-0.543,1.27c0.201,0.501,0.769,0.743,1.27,0.543C15.642,21.1,15.648,21.097,15.655,21.094z"></path><path fill="#009588" d="M19,1.5c1.657,0,3,1.343,3,3s-1.343,3-3,3s-3-1.343-3-3S17.343,1.5,19,1.5z"></path></svg>
                            </span>
                        </div>
                    </div>
                    <div className="_3OtEr">
                        <div className="_3ndVb">
                            <span>
                            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" ><path fill="currentColor" enable-background="new    " d="M19.005,3.175H4.674C3.642,3.175,3,3.789,3,4.821V21.02 l3.544-3.514h12.461c1.033,0,2.064-1.06,2.064-2.093V4.821C21.068,3.789,20.037,3.175,19.005,3.175z M14.016,13.044H7.041V11.1 h6.975V13.044z M17.016,9.044H7.041V7.1h9.975V9.044z"></path></svg>
                            </span>
                        </div>
                    </div>
                    <span></span>
                    <div className="_3OtEr">
                    <div className="_3ndVb">
                            <span>
                            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" ><path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"></path></svg>
                            </span>
                        </div>
                    </div>
                </span>
            </div>
        </div>
    </header>
    <div className="k8VZe">
<div className="startChat">
<div className="_1s7Pa _3wQ5i o7fBL">
    <div className="boxsizeDefine">
        <button className='opCKJ _28iyj'>
<div className="_3xdht _1ZD3q">
    <span >
    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" ><path fill="currentColor" d="M15.009,13.805h-0.636l-0.22-0.219c0.781-0.911,1.256-2.092,1.256-3.386 c0-2.876-2.332-5.207-5.207-5.207c-2.876,0-5.208,2.331-5.208,5.207s2.331,5.208,5.208,5.208c1.293,0,2.474-0.474,3.385-1.255 l0.221,0.22v0.635l4.004,3.999l1.194-1.195L15.009,13.805z M10.201,13.805c-1.991,0-3.605-1.614-3.605-3.605 s1.614-3.605,3.605-3.605s3.605,1.614,3.605,3.605S12.192,13.805,10.201,13.805z"></path></svg>
    </span>
</div>
        </button>
    <form>
        <div className="_2vDPL">
            <input className="" type="search"  id="q" value={q} name="q" placeholder="Search or start new chat"  />
        </div>
    </form> 
    </div>
<button className='btnSet'>
    <div className="logoSet">
        <span>
        <svg viewBox="0 0 24 24" height="20" width="20" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><path fill="currentColor" d="M10,18.1h4v-2h-4V18.1z M3,6.1v2h18v-2H3z M6,13.1h12v-2H6V13.1z"></path></svg>
        </span>
    </div>
</button>
    </div>
</div>
<span className='setLineThrow'></span>
<span></span>
<div className="setRightSide setDirection" style={{overflowY:"auto"}}>
    <div className="_3YS_f _2A1R8" >
        {contactList.map((n)=>(
<div className="lhggkp7q ln8gz9je rx9719la" style={{height:"auto"}}>
    <div className="row" onClick={()=>this.handleUserClick(n.id)}>
        <div className="_199zF _3j691">
            <div className="profileIcon">
            <div className="profileIconAgainSEt">
                <div className="profileSet" style={{height:"49px",width:"49px"}}>
                    <div className="againProfile">
                       {n.profilePic.length===0 ?
                           <span >
                            <svg viewBox="0 0 212 212" height="212" width="212" preserveAspectRatio="xMidYMid meet" class="ln8gz9je ppled2lx" version="1.1" x="0px" y="0px" enable-background="new 0 0 212 212" > <path fill="#DFE5E7" class="background" d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z"></path><g><path fill="#FFFFFF" class="primary" d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z"></path><path fill="#FFFFFF" class="primary" d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z"></path></g></svg>
                           </span>:<span className='setProfile'>
                            <img src={n.profilePic} alt="" className='setImage' />
                            </span>} 
                    </div>
                </div>
            </div>
            </div>
            <div className="nameIcon">
                <div className="setNameIcon">
                    <div className="widthSetName">
                     <span className='getNAme'>
                        <span>{n.name}</span>
                     </span>

                    </div>
                    <div className="TimeSet">
                        <span className='setTime'>{n.lastTextTime}</span>
                    </div>
                </div>
                <div className="setLastMsg">
                    <div className="msgWidth">
                        <span className='setAgainMsg'>
                            <span className='msgPrinted'>{n.lastText}</span>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
        ))}
    </div>
</div>
    </div>
</div>
<div className="_2Ts6i _2xAQV">
    <div className="_64p9P">
        <div className="_1135V">
            <div className="_3SOOk">
                <span className='_3PwsU'>
                    <svg viewBox="0 0 303 172" width="360" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M229.565 160.229C262.212 149.245 286.931 118.241 283.39 73.4194C278.009 5.31929 212.365 -11.5738 171.472 8.48673C115.998 35.6999 108.972 40.1612 69.2388 40.1612C39.645 40.1612 9.51318 54.4147 5.7467 92.952C3.0166 120.885 13.9985 145.267 54.6373 157.716C128.599 180.373 198.017 170.844 229.565 160.229Z" fill="#DAF7F3"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M131.589 68.9422C131.593 68.9422 131.596 68.9422 131.599 68.9422C137.86 68.9422 142.935 63.6787 142.935 57.1859C142.935 50.6931 137.86 45.4297 131.599 45.4297C126.518 45.4297 122.218 48.8958 120.777 53.6723C120.022 53.4096 119.213 53.2672 118.373 53.2672C114.199 53.2672 110.815 56.7762 110.815 61.1047C110.815 65.4332 114.199 68.9422 118.373 68.9422C118.377 68.9422 118.381 68.9422 118.386 68.9422H131.589Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M105.682 128.716C109.186 128.716 112.026 125.908 112.026 122.446C112.026 118.983 109.186 116.176 105.682 116.176C104.526 116.176 103.442 116.481 102.509 117.015L102.509 116.959C102.509 110.467 97.1831 105.203 90.6129 105.203C85.3224 105.203 80.8385 108.616 79.2925 113.335C78.6052 113.143 77.88 113.041 77.1304 113.041C72.7503 113.041 69.1995 116.55 69.1995 120.878C69.1995 125.207 72.7503 128.716 77.1304 128.716C77.1341 128.716 77.1379 128.716 77.1416 128.716H105.682L105.682 128.716Z" fill="white"></path><rect x="0.445307" y="0.549558" width="50.5797" height="100.068" rx="7.5" transform="matrix(0.994522 0.104528 -0.103907 0.994587 10.5547 41.6171)" fill="#42CBA5" stroke="#316474"></rect><rect x="0.445307" y="0.549558" width="50.4027" height="99.7216" rx="7.5" transform="matrix(0.994522 0.104528 -0.103907 0.994587 10.9258 37.9564)" fill="white" stroke="#316474"></rect><path d="M57.1609 51.7354L48.5917 133.759C48.2761 136.78 45.5713 138.972 42.5503 138.654L9.58089 135.189C6.55997 134.871 4.36688 132.165 4.68251 129.144L13.2517 47.1204C13.5674 44.0992 16.2722 41.9075 19.2931 42.2251L24.5519 42.7778L47.0037 45.1376L52.2625 45.6903C55.2835 46.0078 57.4765 48.7143 57.1609 51.7354Z" fill="#EEFEFA" stroke="#316474"></path><path d="M26.2009 102.937C27.0633 103.019 27.9323 103.119 28.8023 103.21C29.0402 101.032 29.2706 98.8437 29.4916 96.6638L26.8817 96.39C26.6438 98.5681 26.4049 100.755 26.2009 102.937ZM23.4704 93.3294L25.7392 91.4955L27.5774 93.7603L28.7118 92.8434L26.8736 90.5775L29.1434 88.7438L28.2248 87.6114L25.955 89.4452L24.1179 87.1806L22.9824 88.0974L24.8207 90.3621L22.5508 92.197L23.4704 93.3294ZM22.6545 98.6148C22.5261 99.9153 22.3893 101.215 22.244 102.514C23.1206 102.623 23.9924 102.697 24.8699 102.798C25.0164 101.488 25.1451 100.184 25.2831 98.8734C24.4047 98.7813 23.5298 98.6551 22.6545 98.6148ZM39.502 89.7779C38.9965 94.579 38.4833 99.3707 37.9862 104.174C38.8656 104.257 39.7337 104.366 40.614 104.441C41.1101 99.6473 41.6138 94.8633 42.1271 90.0705C41.2625 89.9282 40.3796 89.8786 39.502 89.7779ZM35.2378 92.4459C34.8492 96.2179 34.4351 99.9873 34.0551 103.76C34.925 103.851 35.7959 103.934 36.6564 104.033C37.1028 100.121 37.482 96.1922 37.9113 92.2783C37.0562 92.1284 36.18 92.0966 35.3221 91.9722C35.2812 92.1276 35.253 92.286 35.2378 92.4459ZM31.1061 94.1821C31.0635 94.341 31.0456 94.511 31.0286 94.6726C30.7324 97.5678 30.4115 100.452 30.1238 103.348L32.7336 103.622C32.8582 102.602 32.9479 101.587 33.0639 100.567C33.2611 98.5305 33.5188 96.4921 33.6905 94.4522C32.8281 94.3712 31.9666 94.2811 31.1061 94.1821Z" fill="#316474"></path><path d="M17.892 48.4889C17.7988 49.3842 18.4576 50.1945 19.3597 50.2923C20.2665 50.3906 21.0855 49.7332 21.1792 48.8333C21.2724 47.938 20.6136 47.1277 19.7115 47.0299C18.8047 46.9316 17.9857 47.5889 17.892 48.4889Z" fill="white" stroke="#316474"></path><path d="M231.807 136.678L197.944 139.04C197.65 139.06 197.404 139.02 197.249 138.96C197.208 138.945 197.179 138.93 197.16 138.918L196.456 128.876C196.474 128.862 196.5 128.843 196.538 128.822C196.683 128.741 196.921 128.668 197.215 128.647L231.078 126.285C231.372 126.265 231.618 126.305 231.773 126.365C231.814 126.381 231.842 126.395 231.861 126.407L232.566 136.449C232.548 136.463 232.522 136.482 232.484 136.503C232.339 136.584 232.101 136.658 231.807 136.678Z" fill="white" stroke="#316474"></path><path d="M283.734 125.679L144.864 135.363C141.994 135.563 139.493 133.4 139.293 130.54L133.059 41.6349C132.858 38.7751 135.031 36.2858 137.903 36.0856L276.773 26.4008C279.647 26.2005 282.144 28.364 282.345 31.2238L288.578 120.129C288.779 122.989 286.607 125.478 283.734 125.679Z" fill="white"></path><path d="M144.864 135.363C141.994 135.563 139.493 133.4 139.293 130.54L133.059 41.6349C132.858 38.7751 135.031 36.2858 137.903 36.0856L276.773 26.4008C279.647 26.2004 282.144 28.364 282.345 31.2238L288.578 120.129C288.779 122.989 286.607 125.478 283.734 125.679" stroke="#316474"></path><path d="M278.565 121.405L148.68 130.463C146.256 130.632 144.174 128.861 144.012 126.55L138.343 45.695C138.181 43.3846 139.994 41.3414 142.419 41.1723L272.304 32.1142C274.731 31.945 276.81 33.7166 276.972 36.0271L282.641 116.882C282.803 119.193 280.992 121.236 278.565 121.405Z" fill="#EEFEFA" stroke="#316474"></path><path d="M230.198 129.97L298.691 125.193L299.111 131.189C299.166 131.97 299.013 132.667 298.748 133.161C298.478 133.661 298.137 133.887 297.825 133.909L132.794 145.418C132.482 145.44 132.113 145.263 131.777 144.805C131.445 144.353 131.196 143.684 131.141 142.903L130.721 136.907L199.215 132.131C199.476 132.921 199.867 133.614 200.357 134.129C200.929 134.729 201.665 135.115 202.482 135.058L227.371 133.322C228.188 133.265 228.862 132.782 229.345 132.108C229.758 131.531 230.05 130.79 230.198 129.97Z" fill="#42CBA5" stroke="#316474"></path><path d="M230.367 129.051L300.275 124.175L300.533 127.851C300.591 128.681 299.964 129.403 299.13 129.461L130.858 141.196C130.025 141.254 129.303 140.627 129.245 139.797L128.987 136.121L198.896 131.245C199.485 132.391 200.709 133.147 202.084 133.051L227.462 131.281C228.836 131.185 229.943 130.268 230.367 129.051Z" fill="white" stroke="#316474"></path><ellipse rx="15.9969" ry="15.9971" transform="matrix(0.997577 -0.0695704 0.0699429 0.997551 210.659 83.553)" fill="#42CBA5" stroke="#316474"></ellipse><path d="M208.184 87.1094L204.777 84.3593C204.777 84.359 204.776 84.3587 204.776 84.3583C203.957 83.6906 202.744 83.8012 202.061 84.6073C201.374 85.4191 201.486 86.6265 202.31 87.2997L202.312 87.3011L207.389 91.4116C207.389 91.4119 207.389 91.4121 207.389 91.4124C208.278 92.1372 209.611 91.9373 210.242 90.9795L218.283 78.77C218.868 77.8813 218.608 76.6968 217.71 76.127C216.817 75.5606 215.624 75.8109 215.043 76.6939L208.184 87.1094Z" fill="white" stroke="#316474"></path></svg>
                </span>
            </div>
            <div className="setWhatsAppWeb">
                <div className="whatsAppWebHeding">
                    <p>WhatsApp Web</p>
                </div>
                <div className="whatsappPara">
                    Send and receive messages without keeping your phone online. <br/>
                    Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
                </div>
             
            </div>
            <div className="endToend">
                    <span><svg viewBox="0 0 10 12" height="12" width="10" preserveAspectRatio="xMidYMid meet" class="" version="1.1"><path d="M5.00847986,1.6 C6.38255462,1.6 7.50937014,2.67435859 7.5940156,4.02703389 L7.59911976,4.1906399 L7.599,5.462 L7.75719976,5.46214385 C8.34167974,5.46214385 8.81591972,5.94158383 8.81591972,6.53126381 L8.81591972,9.8834238 C8.81591972,10.4731038 8.34167974,10.9525438 7.75719976,10.9525438 L2.25767996,10.9525438 C1.67527998,10.9525438 1.2,10.4731038 1.2,9.8834238 L1.2,6.53126381 C1.2,5.94158383 1.67423998,5.46214385 2.25767996,5.46214385 L2.416,5.462 L2.41679995,4.1906399 C2.41679995,2.81636129 3.49135449,1.68973395 4.84478101,1.60510326 L5.00847986,1.6 Z M5.00847986,2.84799995 C4.31163824,2.84799995 3.73624912,3.38200845 3.6709675,4.06160439 L3.6647999,4.1906399 L3.663,5.462 L6.35,5.462 L6.35111981,4.1906399 C6.35111981,3.53817142 5.88169076,2.99180999 5.26310845,2.87228506 L5.13749818,2.85416626 L5.00847986,2.84799995 Z" fill="currentColor"></path></svg></span>
                    End-to-end encrypted
                </div>
        </div>
    </div>
</div>
</div>
</div>
        ):view===1 ? (
            <div className="_1Fm4m">
            <div className="_1jJ70">
            <div className="_2Ts6i _3RGKj">
                <header className='g0rxnol2 ercejckq cm280p3y p357zi0d gndfcl4n kcgo1i74 ln8gz9je e8h85j61 emrlamx0 aiput80m lyvj5e2u l9g3jx6n f6ipylw5'>
                    <div className="_3WByx">
                        <div className="g0rxnol2 imageBorderRadius" style={{height:"40px",width:"40px",cursor:"pointer"}}>
            <div className="lhggkp7q qq0sjtgm tkdu00h0 p357zi0d gndfcl4n ac2vgrno ln8gz9je ppled2lx bmttxqfw ban5wmpu">
                <svg viewBox="0 0 212 212" height="212" width="212" preserveAspectRatio="xMidYMid meet" class="ln8gz9je ppled2lx" version="1.1" x="0px" y="0px" enable-background="new 0 0 212 212" > <path fill="#DFE5E7" class="background" d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z"></path><g><path fill="#FFFFFF" class="primary" d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z"></path><path fill="#FFFFFF" class="primary" d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z"></path></g></svg>
            
            </div>
                        </div>
                    </div>
                    <div className="_604FD">
                        <div className="_1sPvB _2XdMx">
                            <span>
                                <div className="_3NdAd">
                                    <div className="_3OtEr">
                                        <div className="_3ndVb">
                                            <span>
                                            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path d="m18 11v2h4v-2zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zm4.4-12.01c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zm-16.4 3.4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3v-12l-5 3zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z" fill="currentColor"></path></svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="_3OtEr">
                                    <div className="_3ndVb">
                                        <span>
                                        <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" id="df9d3429-f0ef-48b5-b5eb-f9d27b2deba6" x="0px" y="0px" enable-background="new 0 0 24 24" ><path fill="currentColor" d="M12.072,1.761c-3.941-0.104-7.579,2.105-9.303,5.65c-0.236,0.486-0.034,1.07,0.452,1.305 c0.484,0.235,1.067,0.034,1.304-0.45c1.39-2.857,4.321-4.637,7.496-4.553c0.539,0.02,0.992-0.4,1.013-0.939s-0.4-0.992-0.939-1.013 C12.087,1.762,12.079,1.762,12.072,1.761z M1.926,13.64c0.718,3.876,3.635,6.975,7.461,7.925c0.523,0.13,1.053-0.189,1.183-0.712 c0.13-0.523-0.189-1.053-0.712-1.183c-3.083-0.765-5.434-3.262-6.012-6.386c-0.098-0.53-0.608-0.88-1.138-0.782 C2.178,12.6,1.828,13.11,1.926,13.64z M15.655,21.094c3.642-1.508,6.067-5.006,6.201-8.946c0.022-0.539-0.396-0.994-0.935-1.016 c-0.539-0.022-0.994,0.396-1.016,0.935c0,0.005,0,0.009,0,0.014c-0.107,3.175-2.061,5.994-4.997,7.209 c-0.501,0.201-0.743,0.769-0.543,1.27c0.201,0.501,0.769,0.743,1.27,0.543C15.642,21.1,15.648,21.097,15.655,21.094z"></path><path fill="#009588" d="M19,1.5c1.657,0,3,1.343,3,3s-1.343,3-3,3s-3-1.343-3-3S17.343,1.5,19,1.5z"></path></svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="_3OtEr">
                                    <div className="_3ndVb">
                                        <span>
                                        <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" ><path fill="currentColor" enable-background="new    " d="M19.005,3.175H4.674C3.642,3.175,3,3.789,3,4.821V21.02 l3.544-3.514h12.461c1.033,0,2.064-1.06,2.064-2.093V4.821C21.068,3.789,20.037,3.175,19.005,3.175z M14.016,13.044H7.041V11.1 h6.975V13.044z M17.016,9.044H7.041V7.1h9.975V9.044z"></path></svg>
                                        </span>
                                    </div>
                                </div>
                                <span></span>
                                <div className="_3OtEr">
                                <div className="_3ndVb">
                                        <span>
                                        <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" ><path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"></path></svg>
                                        </span>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </header>
                <div className="k8VZe">
            <div className="startChat">
            <div className="_1s7Pa _3wQ5i o7fBL">
                <div className="boxsizeDefine">
                    <button className='opCKJ _28iyj'>
            <div className="_3xdht _1ZD3q">
                <span >
                <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" ><path fill="currentColor" d="M15.009,13.805h-0.636l-0.22-0.219c0.781-0.911,1.256-2.092,1.256-3.386 c0-2.876-2.332-5.207-5.207-5.207c-2.876,0-5.208,2.331-5.208,5.207s2.331,5.208,5.208,5.208c1.293,0,2.474-0.474,3.385-1.255 l0.221,0.22v0.635l4.004,3.999l1.194-1.195L15.009,13.805z M10.201,13.805c-1.991,0-3.605-1.614-3.605-3.605 s1.614-3.605,3.605-3.605s3.605,1.614,3.605,3.605S12.192,13.805,10.201,13.805z"></path></svg>
                </span>
            </div>
                    </button>
                <form>
                    <div className="_2vDPL">
                        <input className="" type="search"  id="q" value={q} name="q" placeholder="Search or start new chat"  />
                    </div>
                </form> 
                </div>
            <button className='btnSet'>
                <div className="logoSet">
                    <span>
                    <svg viewBox="0 0 24 24" height="20" width="20" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><path fill="currentColor" d="M10,18.1h4v-2h-4V18.1z M3,6.1v2h18v-2H3z M6,13.1h12v-2H6V13.1z"></path></svg>
                    </span>
                </div>
            </button>
                </div>
            </div>
            <span className='setLineThrow'></span>
            <span></span>
            <div className="setRightSide setDirection" style={{overflowY:"auto"}}>
                <div className="_3YS_f _2A1R8" >
                    {contactList.map((n)=>(
            <div className="lhggkp7q ln8gz9je rx9719la" style={{height:"auto"}}>
                <div className="row" onClick={()=>this.handleUserClick(n.id)}>
                {  +id===n.id ? (  
       <div className="_199zF _3j691 _2IMPQ">
            <div className="profileIcon">
            <div className="profileIconAgainSEt">
                <div className="profileSet" style={{height:"49px",width:"49px"}}>
                    <div className="againProfile">
                       {n.profilePic.length===0 ?
                           <span >
                            <svg viewBox="0 0 212 212" height="212" width="212" preserveAspectRatio="xMidYMid meet" class="ln8gz9je ppled2lx" version="1.1" x="0px" y="0px" enable-background="new 0 0 212 212" > <path fill="#DFE5E7" class="background" d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z"></path><g><path fill="#FFFFFF" class="primary" d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z"></path><path fill="#FFFFFF" class="primary" d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z"></path></g></svg>
                           </span>:<span className='setProfile'>
                            <img src={n.profilePic} alt="" className='setImage' />
                            </span>} 
                    </div>
                </div>
            </div>
            </div>
            <div className="nameIcon">
                <div className="setNameIcon">
                    <div className="widthSetName">
                     <span className='getNAme'>
                        <span>{n.name}</span>
                     </span>

                    </div>
                    <div className="TimeSet">
                        <span className='setTime'>{n.lastTextTime}</span>
                    </div>
                </div>
                <div className="setLastMsg">
                    <div className="msgWidth">
                        <span className='setAgainMsg'>
                            <span className='msgPrinted'>{n.lastText}</span>
                        </span>
                    </div>
                </div>
            </div>

        </div>):(      <div className="_199zF _3j691">
            <div className="profileIcon">
            <div className="profileIconAgainSEt">
                <div className="profileSet" style={{height:"49px",width:"49px"}}>
                    <div className="againProfile">
                       {n.profilePic.length===0 ?
                           <span >
                            <svg viewBox="0 0 212 212" height="212" width="212" preserveAspectRatio="xMidYMid meet" class="ln8gz9je ppled2lx" version="1.1" x="0px" y="0px" enable-background="new 0 0 212 212" > <path fill="#DFE5E7" class="background" d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z"></path><g><path fill="#FFFFFF" class="primary" d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z"></path><path fill="#FFFFFF" class="primary" d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z"></path></g></svg>
                           </span>:<span className='setProfile'>
                            <img src={n.profilePic} alt="" className='setImage' />
                            </span>} 
                    </div>
                </div>
            </div>
            </div>
            <div className="nameIcon">
                <div className="setNameIcon">
                    <div className="widthSetName">
                     <span className='getNAme'>
                        <span>{n.name}</span>
                     </span>

                    </div>
                    <div className="TimeSet">
                        <span className='setTime'>{n.lastTextTime}</span>
                    </div>
                </div>
                <div className="setLastMsg">
                    <div className="msgWidth">
                        <span className='setAgainMsg'>
                            <span className='msgPrinted'>{n.lastText}</span>
                        </span>
                    </div>
                </div>
            </div>

        </div>)}
                </div>
            </div>
                    ))}
                </div>
            </div>
                </div>
            </div>
            <div className="_2Ts6i1 _2xAQV">
                <div className="secondPart">
                    <div className="secondPartShowData" data-asset-chat-background-dark="true" style={{opacity:"1.5"}}>
                    </div>
                        <header className='headerSet'>
<div className="profileSet1" title="Profile Details">
<div className="SetProfile" style={{width:"40px",height:"40px"}}>
{this.state.data?.profilePic.length===0 ?
                         
                            <svg viewBox="0 0 212 212" height="212" width="212" preserveAspectRatio="xMidYMid meet" class="ln8gz9je ppled2lx" version="1.1" x="0px" y="0px" enable-background="new 0 0 212 212" > <path fill="#DFE5E7" class="background" d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z"></path><g><path fill="#FFFFFF" class="primary" d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z"></path><path fill="#FFFFFF" class="primary" d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z"></path></g></svg>
                          :
                       
                            <img src={this.state.data?.profilePic} alt="" className='setImage' />
                            } </div>
</div>
<div className="nameSet">
    <div className="nameSetAgain">
        <div className="setNameFor">
            <span className='setNameForOther'>{this.state.data?.name}</span>
        </div>
    </div>
    <div className="lastSeen">
            <span className='lastSeenAgain'>last seen at {this.state.data?.lastTextTime}</span>
    </div>
</div>

<div className="sideBarFor">
    <div className="_1sPvB _2XdMx">
        <div className="searChBar">
            <div className="searchBarAgian">
            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><path fill="currentColor" d="M15.9,14.3H15L14.7,14c1-1.1,1.6-2.7,1.6-4.3c0-3.7-3-6.7-6.7-6.7S3,6,3,9.7 s3,6.7,6.7,6.7c1.6,0,3.2-0.6,4.3-1.6l0.3,0.3v0.8l5.1,5.1l1.5-1.5L15.9,14.3z M9.7,14.3c-2.6,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6 s4.6,2.1,4.6,4.6S12.3,14.3,9.7,14.3z"></path></svg>      
            </div>
        </div>
        <div className="ThreeDot">
        <div className="searChBar">
        <div className="searchBarAgian">
            <span className='threedotAgain'>
            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" ><path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"></path></svg>
            </span>
            </div>
             </div>
        </div>
    </div>
</div>
                        </header>
                        <span className='nfki698u tvf2evcx oq44ahr5 lb5m6g5c'></span>
                        <div className="middlePArt">
                          <div className="middlePArtView">
                            <div className="middlePArtMain" tabIndex="0">
                                <div className="FdUCm"></div>
                            <div className="showDataTop dataTop">
                                <div className="topDataAgain TopData">
                                    <div className="againShowData">
                                    Use WhatsApp on your phone to see older messages from before  
                                    </div>
                                </div>
                            </div>
                            <div className="setMessage" tabIndex="-1">
                            <div className="setMessageAgain">
                           {messagesList.map((n)=>(
                            <div>
                            {data.id===n.id ? (
                                <div className="row">
                                 <div className="setRowForMessage">
                                   <div className={n.senderID===0 ? `messageout`:`messagein`}>
                                    <span></span>
                                    <div className="textClass classText">
                                        <div className="setAgainText textagainSet" >
                                            <div className="nameSetForText">
                                                <span>  {n.text}</span>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    </div>
                                   </div>
                           
                            ) :("")}
                      </div>
                           ))}
                               </div>
                      
                      </div>
                          
                            </div>
                            </div>  
                        </div>
                        <div className="nfki698u tvf2evcx oq44ahr5 lb5m6g5c" style={{height:"0px"}}></div>
                        <footer className='footerSet'>
                           <div className="setFooter setFooter1">
                            <div className="setFooterAgain">
                                <span></span>
                                <span>
                                    <div className="footerClass">
                                        <div className="emojiSet FileSet">
                                        <div className="emojiSetAgain">
                                          <button className='emojibtn'>
                                            <div className="btnSet1">
                                                <span>
                                                <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="ekdr8vow dhq51u3o" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" ><path fill="currentColor" d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"></path></svg>
                                             
                                                </span>
                                            </div>
                                          </button>
                                        </div>
                                        <div className="fileSetAgain">
                                            <div className="setFileAgain">
                                                <div className="_3ndVb" onClick={this.handleFile}>
                                                  <span><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" ><path fill="currentColor" d="M1.816,15.556v0.002c0,1.502,0.584,2.912,1.646,3.972s2.472,1.647,3.974,1.647 c1.501,0,2.91-0.584,3.972-1.645l9.547-9.548c0.769-0.768,1.147-1.767,1.058-2.817c-0.079-0.968-0.548-1.927-1.319-2.698 c-1.594-1.592-4.068-1.711-5.517-0.262l-7.916,7.915c-0.881,0.881-0.792,2.25,0.214,3.261c0.959,0.958,2.423,1.053,3.263,0.215 c0,0,3.817-3.818,5.511-5.512c0.28-0.28,0.267-0.722,0.053-0.936c-0.08-0.08-0.164-0.164-0.244-0.244 c-0.191-0.191-0.567-0.349-0.957,0.04c-1.699,1.699-5.506,5.506-5.506,5.506c-0.18,0.18-0.635,0.127-0.976-0.214 c-0.098-0.097-0.576-0.613-0.213-0.973l7.915-7.917c0.818-0.817,2.267-0.699,3.23,0.262c0.5,0.501,0.802,1.1,0.849,1.685 c0.051,0.573-0.156,1.111-0.589,1.543l-9.547,9.549c-0.756,0.757-1.761,1.171-2.829,1.171c-1.07,0-2.074-0.417-2.83-1.173 c-0.755-0.755-1.172-1.759-1.172-2.828l0,0c0-1.071,0.415-2.076,1.172-2.83c0,0,5.322-5.324,7.209-7.211 c0.157-0.157,0.264-0.579,0.028-0.814c-0.137-0.137-0.21-0.21-0.342-0.342c-0.2-0.2-0.553-0.263-0.834,0.018 c-1.895,1.895-7.205,7.207-7.205,7.207C2.4,12.645,1.816,14.056,1.816,15.556z"></path></svg></span>  
                                                </div>
   { showFiles &&   <span>
           <div className="_2ZCpJ">
            <div className="_8JAXG" style={{transformOrigin:"leftTop"}}>
                <ul className='_3bcLp'>
                  <li className='_1LsXI Iaqxu FCS6Q'>
                    <button className='_1CGek' aria-label='Photos & Videos' style={{opacity:"1",transform:"translateY(0%) scaleX(1) s "}}>      
                    <span className='_3fV_S colorChange'>
                 
                    <svg viewBox="0 0 53 53" height="53" width="53" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 53 53" xmlspace="preserve"><g><defs><circle id="image-SVGID_1_" cx="26.5" cy="26.5" r="25.5"></circle></defs><clipPath id="image-SVGID_2_"><use xlinkhref="#image-SVGID_1_" overflow="visible"></use></clipPath><g clip-path="url(#image-SVGID_2_)"><path fill="#AC44CF" d="M26.5-1.1C11.9-1.1-1.1,5.6-1.1,27.6h55.2C54,8.6,41.1-1.1,26.5-1.1z"></path><path fill="#BF59CF" d="M53,26.5H-1.1c0,14.6,13,27.6,27.6,27.6s27.6-13,27.6-27.6C54.1,26.5,53,26.5,53,26.5z"></path><rect x="17" y="24.5" fill="#AC44CF" width="18" height="9"></rect></g></g><g fill="#F5F5F5"><path id="svg-image" d="M18.318 18.25 34.682 18.25C35.545 18.25 36.409 19.077 36.493 19.946L36.5 20.083 36.5 32.917C36.5 33.788 35.68 34.658 34.818 34.743L34.682 34.75 18.318 34.75C17.368 34.75 16.582 34.005 16.506 33.066L16.5 32.917 16.5 20.083C16.5 19.213 17.32 18.342 18.182 18.257L18.318 18.25 34.682 18.25ZM23.399 26.47 19.618 31.514C19.349 31.869 19.566 32.25 20.008 32.25L32.963 32.25C33.405 32.239 33.664 31.848 33.384 31.492L30.702 28.043C30.486 27.774 30.077 27.763 29.861 28.032L27.599 30.759 24.26 26.459C24.045 26.179 23.614 26.179 23.399 26.47ZM31.75 21.25C30.784 21.25 30 22.034 30 23 30 23.966 30.784 24.75 31.75 24.75 32.716 24.75 33.5 23.966 33.5 23 33.5 22.034 32.716 21.25 31.75 21.25Z"></path></g></svg>
                    </span>
               
                    </button>
                  </li>
                  <li className=' _1LsXI Iaqxu FCS6Q'>
                    <button className='_1CGek' aria-label='New Sticker' style={{opacity:"1",transform:"translateY(0%) scaleX(1) s "}}>      
                   
                    <span className='_3fV_S'>
                     
                    <svg viewBox="0 0 53 53" height="53" width="53" preserveAspectRatio="xMidYMid meet" class="" fill="none"><g clip-path="url(#clip0_850:74884)"><circle cx="26.5" cy="26.5" r="26.5" fill="#0063CB"></circle><path d="M53 26.5C53 41.1356 41.1355 53 26.5 53C11.8645 53 0 41.1356 0 26.5L53 26.5Z" fill="#0070E6"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M36.0017 22.17V26.4891C35.762 26.8114 35.3783 27.0202 34.9458 27.0202H33.1413C29.7615 27.0202 27.0216 29.76 27.0216 33.1398V34.9443C27.0216 35.3777 26.812 35.7621 26.4886 36.0017H22.17C19.3147 36.0017 17 33.687 17 30.8317V22.17C17 19.3147 19.3147 17 22.17 17H30.8317C33.687 17 36.0017 19.3147 36.0017 22.17ZM30.5216 25.5L31.4591 23.4375L33.5216 22.5L31.4591 21.5625L30.5216 19.5L29.5841 21.5625L27.5216 22.5L29.5841 23.4375L30.5216 25.5ZM23.5 22.5L24.9062 25.5938L28 27L24.9062 28.4062L23.5 31.5L22.0938 28.4062L19 27L22.0938 25.5938L23.5 22.5Z" fill="#F7F7F7"></path><path d="M34.9458 28.5202C35.2984 28.5202 35.6358 28.4554 35.9469 28.337C35.8132 29.1226 35.439 29.8536 34.868 30.4246L30.4246 34.868C29.8539 35.4388 29.1232 35.8129 28.338 35.9467C28.4566 35.6353 28.5216 35.2974 28.5216 34.9443V33.1398C28.5216 30.5885 30.5899 28.5202 33.1413 28.5202H34.9458Z" fill="#F7F7F7"></path></g><defs><clipPath id="clip0_850:74884"><rect width="53" height="53" fill="white"></rect></clipPath></defs></svg>
                    </span>
                  
                    </button>
                  </li>
                  <li className=' _1LsXI Iaqxu FCS6Q'>
                    <button className='_1CGek' aria-label='Camera' style={{opacity:"1",transform:"translateY(0%) scaleX(1) s "}}>      
                    <span className='_3fV_S colorChange1'>
                    <svg viewBox="0 0 53 53" height="53" width="53" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 53 53" ><g><defs><circle id="camera-SVGID_1_" cx="26.5" cy="26.5" r="25.5"></circle></defs><clipPath id="camera-SVGID_2_"><use  overflow="visible"></use></clipPath><g clip-path="url(#camera-SVGID_2_)"><path fill="#D3396D" d="M26.5-1.1C11.9-1.1-1.1,5.6-1.1,27.6h55.2C54,8.6,41.1-1.1,26.5-1.1z"></path><path fill="#EC407A" d="M53,26.5H-1.1c0,14.6,13,27.6,27.6,27.6s27.6-13,27.6-27.6C54.1,26.5,53,26.5,53,26.5z"></path><rect x="17" y="24.5" fill="#D3396D" width="15" height="9"></rect></g></g><g fill="#F5F5F5"><path id="svg-camera" d="M27.795 17C28.742 17 29.634 17.447 30.2 18.206L30.5 18.609C31.066 19.368 31.958 19.815 32.905 19.815L34.2 19.815C35.746 19.815 37 21.068 37 22.615L37 32C37 34.209 35.209 36 33 36L20 36C17.791 36 16 34.209 16 32L16 22.615C16 21.068 17.254 19.815 18.8 19.815L20.095 19.815C21.042 19.815 21.934 19.368 22.5 18.609L22.8 18.206C23.366 17.447 24.258 17 25.205 17L27.795 17ZM26.5 22.25C23.601 22.25 21.25 24.601 21.25 27.5 21.25 30.399 23.601 32.75 26.5 32.75 29.399 32.75 31.75 30.399 31.75 27.5 31.75 24.601 29.399 22.25 26.5 22.25ZM26.5 24C28.433 24 30 25.567 30 27.5 30 29.433 28.433 31 26.5 31 24.567 31 23 29.433 23 27.5 23 25.567 24.567 24 26.5 24Z"></path></g></svg>
                    </span>
                    </button>
                  </li>
                  <li className=' _1LsXI Iaqxu FCS6Q'>
                    <button className='_1CGek' style={{opacity:"1",transform:"translateY(0%) scaleX(1) s "}}>      
                    <span className='_3fV_S colorChange2'>
                    <svg viewBox="0 0 53 53" height="53" width="53" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 53 53" xmlspace="preserve"><g><defs><circle id="document-SVGID_1_" cx="26.5" cy="26.5" r="25.5"></circle></defs><clipPath id="document-SVGID_2_"><use xlinkhref="#document-SVGID_1_" overflow="visible"></use></clipPath><g clip-path="url(#document-SVGID_2_)"><path fill="#5157AE" d="M26.5-1.1C11.9-1.1-1.1,5.6-1.1,27.6h55.2C54,8.6,41.1-1.1,26.5-1.1z"></path><path fill="#5F66CD" d="M53,26.5H-1.1c0,14.6,13,27.6,27.6,27.6s27.6-13,27.6-27.6C54.1,26.5,53,26.5,53,26.5z"></path></g></g><g fill="#F5F5F5"><path id="svg-document" d="M29.09 17.09c-.38-.38-.89-.59-1.42-.59H20.5c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H32.5c1.1 0 2-.9 2-2V23.33c0-.53-.21-1.04-.59-1.41l-4.82-4.83zM27.5 22.5V18L33 23.5H28.5c-.55 0-1-.45-1-1z"></path></g></svg>
                    </span>
                    </button>
                  </li>
                  <li className=' _1LsXI Iaqxu FCS6Q'>
                    <button className='_1CGek' style={{opacity:"1",transform:"translateY(0%) scaleX(1) s "}}>      
                    <span className='_3fV_S colorChange3'>
                    <svg viewBox="0 0 53 53" height="53" width="53" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 53 53" xmlspace="preserve"><g><defs><circle id="contact-SVGID_1_" cx="26.5" cy="26.5" r="25.5"></circle></defs><clipPath id="contact-SVGID_2_"><use xlinkhref="#contact-SVGID_1_" overflow="visible"></use></clipPath><g clip-path="url(#contact-SVGID_2_)"><g><path fill="#0795DC" d="M26.5-1.1C11.9-1.1-1.1,5.6-1.1,27.6h55.2C54,8.6,41.1-1.1,26.5-1.1z"></path><path fill="#0EABF4" d="M53,26.5H-1.1c0,14.6,13,27.6,27.6,27.6s27.6-13,27.6-27.6C54.1,26.5,53,26.5,53,26.5z"></path></g></g></g><g fill="#F5F5F5"><path id="svg-contact" d="M26.5 26.5C28.986 26.5 31 24.486 31 22 31 19.514 28.986 17.5 26.5 17.5 24.014 17.5 22 19.514 22 22 22 24.486 24.014 26.5 26.5 26.5ZM26.5 28.75C23.496 28.75 17.5 30.258 17.5 33.25L17.5 34.375C17.5 34.994 18.006 35.5 18.625 35.5L34.375 35.5C34.994 35.5 35.5 34.994 35.5 34.375L35.5 33.25C35.5 30.258 29.504 28.75 26.5 28.75Z"></path></g></svg>
                    </span>
                    </button>
                  </li>
                  <li className=' _1LsXI Iaqxu FCS6Q'>
                    <button className='_1CGek' style={{opacity:"1",transform:"translateY(0%) scaleX(1) s "}}>      
                    <span className='_3fV_S colorChange4'>
                    <svg viewBox="0 0 53 53" height="53" width="53" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 53 53" xmlspace="preserve"><g><defs><circle id="product-SVGID_1_" cx="26.5" cy="26.5" r="25.5"></circle></defs><clipPath id="product-SVGID_2_"><use xlinkhref="#product-SVGID_1_" overflow="visible"></use></clipPath><g clip-path="url(#product-SVGID_2_)"><path fill="#476B7E" d="M26.5-1.1C11.9-1.1-1.1,5.6-1.1,27.6h55.2C54,8.6,41.1-1.1,26.5-1.1z"></path><path fill="#537D93" d="M53,26.5H-1.1c0,14.6,13,27.6,27.6,27.6s27.6-13,27.6-27.6C54.1,26.5,53,26.5,53,26.5z"></path></g></g><g fill="#F5F5F5"><path id="svg-product" d="M18.844 19.75 34.156 19.75C34.758 19.75 35.25 19.3 35.25 18.75 35.25 18.2 34.758 17.75 34.156 17.75L18.844 17.75C18.242 17.75 17.75 18.2 17.75 18.75 17.75 19.3 18.242 19.75 18.844 19.75ZM35.39 21.89C35.292 21.389 34.845 20.75 34.322 20.75L18.678 20.75C18.155 20.75 17.708 21.389 17.61 21.89L16.52 27.337C16.39 28.013 16.902 28.75 17.588 28.75L18 28.75 18 34C18 34.599 18.275 35.25 18.874 35.25L27.589 35.25C28.189 35.25 28.5 34.599 28.5 34L28.5 28.75 33 28.75 33 34.092C33 34.691 33.401 35.25 34 35.25 34.599 35.25 35 34.691 35 34.092L35 28.75 35.412 28.75C36.098 28.75 36.61 28.013 36.48 27.337L35.39 21.89ZM26.5 33.25 20 33.25 20 28.75 26.5 28.75 26.5 33.25Z"></path></g></svg>
                    </span>
                    </button>
                  </li>
                  <li className=' _1LsXI Iaqxu FCS6Q'>
                    <button className='_1CGek' style={{opacity:"1",transform:"translateY(0%) scaleX(1) s "}}>      
                    <span className='_3fV_S'>
                    <svg viewBox="0 0 53 53" height="53" width="53" preserveAspectRatio="xMidYMid meet" class="" fill="none"><g clip-path="url(#clip0)"><circle cx="26.5" cy="26.5" r="26.5" fill="#DBB310"></circle><path d="M53 26.5C53 41.1356 41.1355 53 26.5 53C11.8645 53 0 41.1356 0 26.5L53 26.5Z" fill="#EEC312"></path></g><path d="M24.4831 38C24.0554 38 23.7254 37.6211 23.7865 37.1933L24.8865 29.4444H20.6087C19.5331 29.4444 20.2054 28.5278 20.2298 28.4911C21.7698 25.7656 24.0798 21.7322 27.1354 16.3544C27.2576 16.1344 27.502 16 27.7465 16C28.1742 16 28.5042 16.3789 28.4431 16.8067L27.3431 24.5556H31.6331C32.122 24.5556 32.3909 24.7878 32.122 25.3622C28.1009 32.3778 25.7665 36.4722 25.0942 37.6456C24.972 37.8656 24.7398 38 24.4831 38Z" fill="#F5F5F5"></path><defs><clipPath id="clip0"><rect width="53" height="53" fill="white"></rect></clipPath></defs></svg>
                    </span>
                    </button>
                  </li>
                  <li className=' _1LsXI Iaqxu FCS6Q'>
                    <button className='_1CGek' style={{opacity:"1",transform:"translateY(0%) scaleX(1) s "}}>      
                    <span className='_3fV_S'>
                    <svg viewBox="0 0 53 53" height="53" width="53" preserveAspectRatio="xMidYMid meet" class="" fill="none"><circle cx="26.5" cy="26.5" r="26.5" fill="#02A698"></circle><path opacity="0.15" d="M26.5 0C11.8645 0 0 11.8645 0 26.5H53C53 11.8645 41.1355 0 26.5 0Z" fill="#111B21"></path><rect x="15.7051" y="26.6035" width="5.94055" height="9.50487" rx="1.21053" fill="white"></rect><rect x="24.0215" y="14.7227" width="5.94055" height="21.386" rx="1.21053" fill="white"></rect><rect x="32.3379" y="21.8496" width="5.94055" height="14.2573" rx="1.21053" fill="white"></rect></svg>
                    </span>
                    </button>
                  </li>

                </ul>
            </div>
            </div> 
        </span>}
                                            </div>
                                        </div>
                                        </div>
                                        <div className="setInputFor">
                                            <div className="setInputAgain">
                                                <div className="setClassInput">
                                            <form onSubmit={this.handleSubmit}>
                    <div className="setForm" style={{maxHeight:"7.35em",minHeight:"1.47em",userSelect:"text",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>
                        <input className="setForInput" type="text"  id="msgSend" value={msgSend} name="msgSend" placeholder="Type a message"         onChange={this.handleChange}    />
                    </div>
                </form>  
                </div> 
                                            </div>
                                            <div className="setRadio againRadio">
                                              {msgSend.length>=1 ?  (
                                                      <form onSubmit={this.handleSubmit}>
                                                <button type='submit' className='setSendBtn' >
                                                    <span>
                                                    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
                                                    </span>
                                                </button>
                                                </form>
                                              ) :(
                                                  <button className='btnSetForRadio'>
                                                  <span>
                                                  <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><path fill="currentColor" d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"></path></svg>
                                                  </span>
                                              </button>
                                              )}
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            </div>
                            </div> 
                        </footer>
                
                </div>
            </div>
          
        
            </div>
            </div>
        ):("")
    )
  }
}
