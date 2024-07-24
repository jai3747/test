import { Card, Typography, Icon, TextField, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import styles from "./GitSetting.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import GithubIcon from '@mui/icons-material/GitHub';
import SaveIcon from '@mui/icons-material/Save';
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function GitSettingComponent({ data, setSnackbar }) {
    const [showToken, setShowToken] = useState(false);
    const [save, setSave] = useState({
        name: "",
        url: "",
        access_token: "",
        id: "",
        owner: "",
    })

    useEffect(() => {
        setSave(
            {
                name: data.name,
                url: data.url,
                access_token: data.access_token,
                id: data.id,
                owner: data.owner
            }
        )
    }, [data]);

    const putSave = (data) => {
        let requestURL = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/settings/git/update?id=${data.id}`

        fetch(requestURL, { method: "PUT", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return response.text().then(text => {throw new Error(text)})
            }
        })
        .then(json => {
            setSnackbar((old) => ({ ...old, ...{ open: true, message: "Update successful" } }))
            setSave((old) => ({ ...old, ...{ data: json } }))
        })
        .catch(error => {
            setSnackbar((old) => ({ ...old, ...{ open: true,type: "error", message: error.message } }))
        })
    }

    const deleteGit = async (data) => {
        let requestURL = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v1/settings/git/delete/${data.name}`

        fetch(requestURL, {
            method: "DELETE", headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return response.text().then(text => {throw new Error(text)})
            }
        })
        .then(json => {
            setSnackbar((old) => ({ ...old, ...{ open: true, message: "Delete successful" } }))
            setSave((old) => ({ ...old, ...{ data: json } }))
        })
        .catch(error => {
            setSnackbar((old) => ({ ...old, ...{ open: true,type: "error", message: error.message } }))
        })
    }

    return (
        <div>
            <Card elevation={2} sx={{
                display: "flex", flexDirection: "column", backgroundColor: "rgb(255,255,255)",
                justifyContent: "space-between", alignItems: "flex-start", padding: 3, gap: 1
            }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", height: "2rem" }}>
                    <div>
                        {data.provider == "gitlab" && <Icon sx={{ width: "40px", height: "40px" }}>
                            <img src="/Iconsvg/gitlab-logo-500.svg"></img>
                        </Icon>}
                        {data.provider == "github" && <GithubIcon sx={{ width: "30px", height: "30px" }}>
                        </GithubIcon>}
                    </div>

                    <div className={styles.divTopRight}>
                        <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => { deleteGit(save) }}>Delete</Button>
                        <Button variant="contained" startIcon={<SaveIcon />} onClick={() => { putSave(save) }}>Save</Button>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: "10px", width: "100%", height: "5rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <Typography style={{ marginRight: "auto", }} fontSize={"15px"} fontWeight={600}>Name</Typography>
                        <TextField required={true} variant={"outlined"} size={"small"}
                            onChange={(e) => {
                                setSave((old) => ({
                                    ...old,
                                    ...{ name: e.target.value }
                                }))
                            }}
                            sx={{ minWidth: "24rem" }}
                            value={save.name}
                            InputProps={{
                                style: {
                                    backgroundColor: "#FCFCFD",
                                    borderRadius: "5px",
                                    border: "#C1D3CE solid 0.2px",
                                },
                            }}></TextField>
                    </div>
                    {data.provider === "gitlab" && <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <Typography style={{ marginRight: "auto", }} fontSize={"15px"} fontWeight={600}>URL</Typography>
                        <TextField required={true} variant={"outlined"} size={"small"}
                            onChange={(e) => {
                                setSave((old) => ({
                                    ...old,
                                    ...{ url: e.target.value }
                                }))
                            }}
                            sx={{ minWidth: "24rem" }}
                            value={save.url}
                            InputProps={{
                                style: {
                                    backgroundColor: "#FCFCFD",
                                    borderRadius: "5px",
                                    border: "#C1D3CE solid 0.2px",
                                },
                            }}></TextField>
                    </div>}
                    {data.provider === "github" && <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <Typography style={{ marginRight: "auto", }} fontSize={"15px"} fontWeight={600}>Owner</Typography>
                        <TextField required={true} variant={"outlined"} size={"small"}
                            onChange={(e) => {
                                setSave((old) => ({
                                    ...old,
                                    ...{ owner: e.target.value }
                                }))
                            }}
                            sx={{ minWidth: "24rem" }}
                            value={save.owner}
                            InputProps={{
                                style: {
                                    backgroundColor: "#FCFCFD",
                                    borderRadius: "5px",
                                    border: "#C1D3CE solid 0.2px",
                                },
                            }}></TextField>
                    </div>}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <Typography style={{ marginRight: "auto", }} fontSize={"15px"} fontWeight={600}>Private Access Token</Typography>
                        <TextField required={true} variant={"outlined"} size={"small"}
                            onChange={(e) => {
                                setSave((old) => ({
                                    ...old,
                                    ...{ access_token: e.target.value }
                                }))
                            }}
                            sx={{ minWidth: "24rem" }}
                            value={save.access_token}
                            type={!showToken && "password"}
                            InputProps={{
                                style: {
                                    backgroundColor: "#FCFCFD",
                                    borderRadius: "5px",
                                    border: "#C1D3CE solid 0.2px",
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Icon
                                            aria-label="toggle password visibility"
                                            onClick={() => {
                                                setShowToken(!showToken)
                                            }}
                                            sx={{
                                                cursor: "pointer"
                                            }}
                                        >
                                            {showToken ? <Visibility /> : <VisibilityOff />}
                                        </Icon>
                                    </InputAdornment>),
                            }}></TextField>
                    </div>
                </div>
            </Card>
        </div>
    )
}
