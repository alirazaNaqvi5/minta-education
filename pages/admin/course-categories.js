import PageBanner from '@/components/Common/PageBanner'
import { parseCookies } from 'nookies'
import React from 'react'
import { Input, Row, Button, Form, Container, Card } from 'reactstrap'

const CourseCategoriesPage = ({ categories }) => {
    return (
        <div>
            <PageBanner
                pageTitle="Course Categories"
                homePageUrl="/"
                homePageText="Home"
                activePageText="Course Categories"
            />
            <Container>
<Card className='p-6'>
                <Form method="POST">
            <Row>


                    <Input required name='name' type="text" placeholder="Enter Category Name" />
                    <Button className="btn btn-primary">Add Category</Button>
            </Row>
                </Form>
</Card>
<Card className='p-6 m-6'>

            {
                categories.map(category => (
                    <Row key={category.id}>
                        <div className="col-md-6">
                            <p>{category.name}</p>
                        </div>
                        <div className="col-md-6">
                            <Form method="POST">
                                <Input type="hidden" name='id' value={category.id} />
                                <Button className="btn btn-danger">Delete</Button>
                            </Form>
                        </div>
                    </Row>
                ))
            }
            </Card>
            </Container>

        </div>
    )
}

import qs from 'querystring'
import getRawBody from 'raw-body'
export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx)
    const { CourseCategories } = await import('@/models/index')
    const { req } = ctx
    try {
        if (!token) {
            return { categories: [], error: 'You need to login first' }
        }

        const categories = await CourseCategories.findAll()

        if (req.method === 'POST') {
            const body = qs.parse((await getRawBody(req)).toString('utf-8'))
            try{

                const { name } = body
                
                const category = await CourseCategories.create({ name })
                return {
                    props: {
                        categories: JSON.parse(JSON.stringify([...categories, category])),
                        success: `Category added successfully`
                    }
                }
            } catch (error) {
                const {id} = body
                  
                    await CourseCategories.destroy({ where: { id } })
        
                    return {
                        props: {
                            categories: JSON.parse(JSON.stringify(categories)).filter(category => category.id !== id),
                            success: `Category ${id} deleted successfully`
                        }
                    }
            }
        }

        


        return {
            props: {
                categories : JSON.parse(JSON.stringify(categories)),
                success: 'Category Fetched successfully'
            }
        }
    } catch (error) {
        return {
            props: {
                categories: [],
                error: 'Something went wrong',
                message: error.message
            }
        }

    }
}


export default CourseCategoriesPage