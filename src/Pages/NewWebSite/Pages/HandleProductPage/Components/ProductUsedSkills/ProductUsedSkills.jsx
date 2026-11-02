//React
import { useEffect, useState } from 'react'

import { v4 as uuIdv4 } from 'uuid'

//Components
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

//MUI
import {
    Grid,
    FormLabel,
    TextField,
    Card,
    Typography,
    Box,
    TextareaAutosize,
    IconButton    
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { AdminMainButton } from '../../../../../../Components'

//Styled Components
const StyledProductUsedSkills = styled(Grid)(
    () => ({
        // Add your styles here
    })
)

// TODO: fix delete problem

const ProductUsedSkills = ({ data }) => {
    const { productData, setProductData } = data;

    //to add new skill
    const writeNewSkill = () => {
        return {
            'id': uuIdv4(),
            'product_used_skill_name': "New Skill",
            'how_used': "How Used...",
            'product_id': productData?.id || null
        }
    }

    const [skills, setSkills] = useState([])

    useEffect(() => {
        if (productData?.product_used_skills) {
            setSkills(productData.product_used_skills)
        }
    }, [productData])

    const handleAddNewSkill = () => {
        const newSkill = writeNewSkill()
        const newSkills = [...skills, newSkill]
        setProductData(prev => ({ ...prev, 'product_used_skills': newSkills }))
    }

    const handleDeleteSkill = (id) => {
        const updatedSkills = skills.filter(skill => skill.id !== id);
        setProductData(prev => ({ ...prev, product_used_skills: updatedSkills }));
    };

    return (
        <StyledProductUsedSkills spacing={2} container>
            {skills.length > 0 &&
                skills.map((skill) => (
                    <Grid key={skill.id} item xxs={12} md={6} lg={4}>
                        <SkillTextField
                            skill={skill}
                            setProductData={setProductData}
                            handleDeleteSkill={handleDeleteSkill}
                        />
                    </Grid>
                ))
            }
            <Grid item xxs={12} md={6} lg={4}>
                <Card 
                    sx={{
                        height: '100%', 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        transition: '0.3s',
                        cursor: 'pointer',
                        "&:hover": { backgroundColor: theme => theme.palette.action.hover }
                    }} 
                    elevation={3}
                    onClick={handleAddNewSkill}
                >
                    <AdminMainButton
                        title='New Skill'
                        type='custom'
                        appearance='iconButton'
                        icon={<AddIcon />}
                        putBorder
                    />
                </Card>
            </Grid>
        </StyledProductUsedSkills>
    );
};

ProductUsedSkills.propTypes = {
    data: propTypes.object.isRequired,
    handleOnChange: propTypes.func,
}

export default ProductUsedSkills;

const StyledTextArea = styled(TextareaAutosize)(
    ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        border: "2px solid",
        borderColor: theme.palette.divider,
        resize: "none",
        width: "100%",
        borderRadius: "6px",
        color: theme.palette.text.primary,
        outline: "none",
        fontSize: "1rem",
        padding: theme.spacing(1),
        "&:focus": {
            borderColor: theme.palette.primary.main,
        }
    })
)

const SkillTextField = ({ skill, setProductData, handleDeleteSkill }) => {
    const [skillState, setSkillState] = useState(skill);

    useEffect(() => {
        setProductData(prev => {
            if (prev?.product_used_skills) {
                const updatedSkills = prev.product_used_skills.map(sk => 
                    sk.id === skillState.id ? skillState : sk
                );
                return {
                    ...prev,
                    product_used_skills: updatedSkills
                };
            }
            return {
                ...prev,
                product_used_skills: [skillState]
            };
        });
    }, [skillState, setProductData]);

    const handleOnChangeSkillName = (e) => {
        setSkillState(prev => ({ ...prev, 'product_used_skill_name': e.target.value }))
    }

    const handleOnChangeSkillHowUsed = (e) => {
        setSkillState(prev => ({ ...prev, 'how_used': e.target.value }))
    }

    const handleDelete = () => {
        handleDeleteSkill(skillState.id);
    };

    return (
        <Card elevation={3} sx={{ padding: theme => theme.spacing(2), position: 'relative' }}>
            <IconButton onClick={handleDelete} 
                sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                }}    
            >
                <ClearIcon color='error' />
            </IconButton>
            <Typography variant='h6' ml={2} mb={2} whiteSpace={'nowrap'} width={100} overflow={'hidden'} textOverflow={'ellipsis'}>
                {skillState?.product_used_skill_name}
            </Typography>
            <Box mb={2}>
                <FormLabel>
                    Skill
                </FormLabel>
                <TextField 
                    fullWidth
                    size='small'
                    name='product_used_skill_name'
                    value={skillState?.product_used_skill_name}
                    onChange={handleOnChangeSkillName}
                />
            </Box>
            <Box>
                <FormLabel>
                    How Used
                </FormLabel>
                <StyledTextArea
                    minRows={3}
                    maxRows={10}
                    name="how_used"
                    value={skillState?.how_used}
                    onChange={handleOnChangeSkillHowUsed}
                />
            </Box>
        </Card>
    )
}

SkillTextField.propTypes = {
    skill: propTypes.object.isRequired,
    setProductData: propTypes.func.isRequired,
    handleDeleteSkill: propTypes.func.isRequired,
};
