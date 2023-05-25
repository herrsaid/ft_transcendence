import './profile.css'
import {FaChevronUp, FaDollarSign, FaTrophy, FaUserEdit} from 'react-icons/fa'



export default function Profile()
{
    return(
        <div className="Profile">
                <div className="side_one">
                            <h3 className="first_h3">Friends</h3>
                            <div className="Friends"></div>


                            <h3 className="second_h3">Groups</h3>
                        <div className="Groups"></div>
                </div>

                <div className="side_two">
                    <div className="side_two_nav">
                        <p><span className="span_one"><span><FaTrophy /></span> <span> 4132 </span> </span><span className="span_one"><span><FaChevronUp/></span> <span> 3 </span></span>
                        
                        <span className="span_one"><span><FaDollarSign/></span> <span> 480</span></span>
                        
                        
                        <span className="span_right"><FaUserEdit/></span>
                        </p>
                    </div>
                    <div className="side_two_info">

                        <div className="profile_avatar">
                            <img src="/avatar.png" ></img>
                            <p className="username">mabdelou</p>
                        </div>

                        <div className="info">
                            <p>
                            <span className="group_wins">Wins:<span className="wins_span">50</span></span>
                            <span className="group_wins">Rank:<span className="wins_span">Gold-P3</span></span>
                            </p>

                            <p>
                            <span className="group_wins">Loss:<span className="wins_span">20</span></span>
                            <span className="group_wins">Location:<span className="wins_span">morroco</span></span>
                            </p>


                            <p>
                            <span className="group_wins">Total Game:<span className="wins_span">77</span></span>
                            <span className="group_wins">Status:<span className="wins_span">Available</span></span>
                            </p>


                            <p>
                                <div className="progress_level">
                                    <p>level 8.81</p>
                                </div>
                            </p>
                        </div>

                    </div>
                    <div className="side_two_history">

                        <h2>history</h2>

                        <div className="victory_div">
                            <div className="info_victory">
                                <p>Score:    2036</p>
                                <p>Rank:     +56</p>
                            </div>

                            <div className="result_victory">
                                <p>Victory</p>
                                <p>8 - 6</p>
                            </div>

                            <div className="game_victory">
                               <h3>PingPong</h3>
                            </div>
                        </div>



                        <div className="victory_div">
                            <div className="info_victory">
                                <p>Score:    2036</p>
                                <p>Rank:     +56</p>
                            </div>

                            <div className="result_victory">
                                <p>Victory</p>
                                <p>8 - 6</p>
                            </div>

                            <div className="game_victory">
                               <h3>PingPong</h3>
                            </div>
                        </div>





                        <div className="victory_div">
                            <div className="info_victory">
                                <p>Score:    2036</p>
                                <p>Rank:     +56</p>
                            </div>

                            <div className="result_victory">
                                <p>Victory</p>
                                <p>8 - 6</p>
                            </div>

                            <div className="game_victory">
                               <h3>PingPong</h3>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="side_three">

                    <h3 className="first_h3">Achievevements</h3>
                    <div className="Achievevements"></div>

                    <h3 className="second_h3">Store</h3>
                    <div className="Store"></div>
                </div>
        </div>
    );
}