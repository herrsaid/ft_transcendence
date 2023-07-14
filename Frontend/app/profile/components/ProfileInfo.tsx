
        
const ProfileInfo = (props) => {
    return (
        <div>
                <div className="info">
                                <div className="inside_info_p">
                                <div className="info_b_one">
                                    <div>
                                    <span className="group_wins">Wins: <span className="wins_span">{props.wins}</span></span>
                                    </div>
                                    <div>
                                    <span className="group_wins">Rank: <span className="wins_span">{props.rank}</span></span>
                                    </div>
                                </div>
                                
                                
                                

                                <div className="info_b_one">

                                    <div>
                                    <span className="group_wins">Loss: <span className="wins_span">{props.loss}</span></span>
                                    </div>
                                    <div>
                                    <span className="group_wins">Location: <span className="wins_span">{props.location}</span></span>
                                    </div>
                                </div>
                                
                                <div className="info_b_one">
                                    <div>
                                    <span className="group_wins">Total Game: <span className="wins_span">{props.totalgame}</span></span>
                                    </div>
                                    <div>
                                    <span className="group_wins">Status: <span className="wins_span">Available</span></span>
                                    </div>
                                </div>

                                    {/* <div className="progress_level">
                                        <p>level 8.81</p>
                                    </div> */}
                                </div>
                            </div>
        </div>
        
    );
};
export default ProfileInfo;
